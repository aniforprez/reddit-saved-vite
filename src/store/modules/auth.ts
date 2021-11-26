import snoowrap from "snoowrap";

import { Commit } from "vuex";

import config from "@/config";

interface State {
  token: string | null;
  tokenExpireTimestamp: number | null;
  username: string | null;
  authStatus: "unauthenticated" | "authenticated" | "errored";
}

const state: State = {
  token: null,
  tokenExpireTimestamp: null,
  username: null,
  authStatus: "unauthenticated",
};

const getters = {
  redirectURL: (): string => {
    return snoowrap.getAuthUrl({
      clientId: config.clientId,
      redirectUri: config.redirectURL,
      scope: ["history", "save", "identity", "vote", "report"],
      permanent: false,
    });
  },
  token: (state: State): string | null => state.token,
  username: (state: State): string | null => state.username,
  authStatus: (state: State): string => state.authStatus,
};

export enum MutationTypes {
  SET_USERNAME = "SET_USERNAME",
  SET_TOKEN_AND_EXPIRY = "SET_TOKEN_AND_EXPIRY",
  SET_AUTH_STATUS = "SET_AUTH_STATUS",
}

const mutations = {
  [MutationTypes.SET_USERNAME](state: State, username: string): void {
    state.username = username;
  },
  [MutationTypes.SET_TOKEN_AND_EXPIRY](
    state: State,
    payload: { token: string; tokenExpireTimestamp: number }
  ): void {
    state.token = payload.token;
    localStorage.setItem("redditToken", payload.token);

    state.tokenExpireTimestamp = payload.tokenExpireTimestamp;
    localStorage.setItem(
      "redditTokenExpireTimestamp",
      String(payload.tokenExpireTimestamp)
    );
  },
  [MutationTypes.SET_AUTH_STATUS](
    state: State,
    status: "unauthenticated" | "authenticated" | "errored"
  ): void {
    state.authStatus = status;
  },
};

const actions = {
  async authenticateRedditWithCode(
    { commit }: { commit: Commit; state: State },
    redditCode: string
  ): Promise<void> {
    let authResponse = null;
    try {
      authResponse = await snoowrap.fromAuthCode({
        code: redditCode,
        redirectUri: config.redirectURL,
        clientId: config.clientId,
        userAgent: "",
      });
    } catch (error) {
      commit(MutationTypes.SET_AUTH_STATUS, "errored");
      throw error;
    }

    const authToken = authResponse.accessToken;

    const snooObj = new snoowrap({ accessToken: authToken, userAgent: "" });
    let username = null;

    snooObj
      .getMe()
      .then((userInfo) => {
        username = userInfo.name;
      })
      .catch((error) => {
        commit(MutationTypes.SET_AUTH_STATUS, "errored");
        throw error;
      });

    commit(MutationTypes.SET_TOKEN_AND_EXPIRY, {
      token: authToken,
      tokenExpireTimestamp: authResponse.tokenExpiration,
    });
    commit(MutationTypes.SET_USERNAME, username);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

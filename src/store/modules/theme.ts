import { Commit } from "vuex";

interface State {
  theme: "light" | "dark";
}

const state: State = {
  theme: "dark",
};

const getters = {
  theme: (state: State): string => state.theme,
};

const mutations = {
  SET_THEME(state: State, theme: "light" | "dark"): void {
    state.theme = theme;
    localStorage.setItem("theme", theme);
  },
};

const actions = {
  initTheme({ commit }: { commit: Commit }): void {
    const cachedTheme = localStorage.theme ? localStorage.theme : false;
    //  `true` if the user has set theme to `dark` on browser/OS
    const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (cachedTheme) commit("SET_THEME", cachedTheme);
    else if (userPrefersDark) commit("SET_THEME", "dark");
  },
  toggleTheme({ commit }: { commit: Commit }): void {
    if (localStorage.getItem("theme") === "dark") {
      commit("SET_THEME", "light");
    } else {
      commit("SET_THEME", "dark");
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

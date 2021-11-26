interface AppConfiguration {
  appTitle: string
  clientId: string
  redirectURL: string
}

const config: AppConfiguration = {
  appTitle: import.meta.env.VITE_APP_TITLE,
  clientId: import.meta.env.VITE_REDDIT_CLIENT_ID,
  redirectURL: import.meta.env.VITE_REDDIT_OAUTH_REDIRECT_URL,
}

export default config;

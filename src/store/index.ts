import { createLogger, createStore } from "vuex";

import auth from "./modules/auth";
import theme from "./modules/theme";

const debugMode = import.meta.env.MODE !== "production";

export default createStore({
  modules: {
    auth,
    theme,
  },
  strict: debugMode,
  plugins: debugMode ? [createLogger()] : [],
});

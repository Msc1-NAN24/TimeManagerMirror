import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import {createPinia} from "pinia";
import {useAuth} from "@/hook/useAuth";

// Fix Property 'env' does not exist on type 'ImportMeta'.
declare global {
  interface ImportMeta {
    env: {
      VITE_URL_API: string;
    };
  }
}

loadFonts();

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .use(vuetify)
  .use((app, options) => {
    const auth = useAuth();
    auth.loginFromStorage();
  })
  .mount("#app");

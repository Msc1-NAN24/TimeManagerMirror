import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();

createApp(App).use(router).use(vuetify).mount("#app");

// Fix Property 'env' does not exist on type 'ImportMeta'.
declare global {
  interface ImportMeta {
    env: {
      VITE_URL_API: string;
    };
  }
}

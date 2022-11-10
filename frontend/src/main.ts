import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createPinia } from "pinia";
import ToastPlugin from "vue-toast-notification";
import "vue3-lottie/dist/style.css";
import Vue3Lottie from "vue3-lottie";
import "vue-toast-notification/dist/theme-sugar.css";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {useAuthStore} from "@/store/AuthStore";


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
  .use( (app, options) => {
    const auth = useAuthStore();
    auth.loginFromStorage();
  })
  .use(router)
  .use(vuetify)
  .use(Vue3Lottie)
  .component("Datepicker", Datepicker)
  .use(ToastPlugin, { position: "bottom-right" })
  .mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createI18n } from "vue-i18n";
import { translations } from "./i18n/index";

loadFonts();

const i18n = createI18n({
  locale: "fr",
  fallbackLocale: "en",
  translations,
});

console.log(i18n);

createApp(App).use(router).use(store).use(vuetify).use(i18n).mount("#app");

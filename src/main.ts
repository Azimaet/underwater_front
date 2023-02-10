import { Apollo } from "./plugins/apollo";
import App from "./App.vue";
import VueApolloComponents from "@vue/apollo-components";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";
import store from "./store";
import { translations } from "./i18n/index";
import vuetify from "./plugins/vuetify";

loadFonts();

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  translations,
});

store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(Apollo)
  .use(VueApolloComponents)
  .use(i18n)
  .mount("#app");

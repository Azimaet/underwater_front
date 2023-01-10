import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

import HomeView from "@/components/views/HomeView.vue";
import { isLogged } from "@/composables/auth";
import { translations } from "@/i18n/index";
import { useAlertFactory } from "@/composables/alertFactory";

const { WARNING_ANON } = translations.en.ALERTS;
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/profile",
    name: "profile",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/components/views/ProfileView.vue"
      ),
  },
  {
    path: "/dives",
    name: "dives",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/components/views/DivesListView.vue"
      ),
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/components/views/SettingsView.vue"
      ),
  },
  {
    path: "/dive_form",
    name: "dive_form",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/components/views/DiveFormView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  if (!isLogged() && to.name !== "home") {
    useAlertFactory("warning", WARNING_ANON);
    return { name: "home" };
  }
});

export default router;

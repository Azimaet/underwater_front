import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

import HomeView from "@/components/views/HomeView.vue";

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
    path: "/settings",
    name: "settings",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/components/views/SettingsView.vue"
      ),
  },
  {
    path: "/dive_log",
    name: "dive_log",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/components/views/DiveLogView.vue"
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

export default router;

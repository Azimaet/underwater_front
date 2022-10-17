import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

import HomeView from "@/components/views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/components/views/LoginView.vue"
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
  {
    path: "/profile",
    name: "profile",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/components/views/ProfileView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

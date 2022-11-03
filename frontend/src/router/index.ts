import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/workingTimes/:userI",
      name: "workingTimes",
      component: () => import("../views/WorkingTimes.vue"),
    },
    {
      path: "/workingTime/:userid/:workingtimeid",
      name: "workingTime",
      component: () => import("../views/WorkingTime.vue"),
    },
    {
      path: "/clock/:username",
      name: "clock",
      component: () => import("../views/Clock.vue"),
    },
    {
      path: "/chartManager/:userid",
      name: "chartManager",
      component: () => import("../views/ChartManager.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
  ],
});

export default router;
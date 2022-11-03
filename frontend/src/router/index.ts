import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProfilePage from "@/views/users/ProfilePage.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import {tr} from "vuetify/locale";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: NavigationDrawer,
      children: [
        {
          path: "/",
          component: HomeView,
          name: "home"
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
          path: "/user/profile",
          name: "profile",
          components: {
            default: () => ProfilePage,
          }
        }
      ]
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
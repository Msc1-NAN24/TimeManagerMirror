import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";

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
          path: "/teams",
          children: [
            {
              path: "/",
              name: "teams",
              component: import("../views/teams/TeamListPage.vue"),
            },
            {
              path: "/:id",
              name: "team",
              component: import("../views/teams/TeamPage.vue"),
            }
          ]
        },
        {
          path: "/user/profile",
          name: "profile",
          component: () => import("../views/users/ProfilePage.vue"),
        },
        {
          path: '/user/reset-password',
          name: 'reset-password',
          component: () => import("../views/users/ChangePasswordPage.vue")
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
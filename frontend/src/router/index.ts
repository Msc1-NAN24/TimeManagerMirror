import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import { IsLogged, useAuthStore } from "@/store/AuthStore";
import { userRank } from "@/dto/user";
import { useToast } from "vue-toast-notification";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/auth/Register.vue"),
    },
    {
      path: "/",
      component: NavigationDrawer,
      children: [
        {
          path: "/",
          component: HomeView,
          name: "home",
        },
        {
          path: "/workingtimes/:userid/:workingtimeid",
          name: "workingtime",
          component: () => import("../views/WorkingTime.vue"),
        },
        {
          path: "/workingtimes/:userid",
          name: "workingtimes",
          component: () => import("../views/WorkingTimes.vue"),
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
              path: "",
              name: "teams",
              component: () => import("../views/teams/TeamListPage.vue"),
            },
            {
              path: ":id",
              name: "team",
              component: () => import("../views/teams/TeamPage.vue"),
            },
          ],
        },
        {
          path: "/user/profile",
          name: "myProfile",
          component: () => import("../views/users/ProfilePage.vue"),
        },
        {
          path: "/user/:id/profile",
          name: "profile",
          component: () => import("../views/users/ProfilePage.vue"),
        },
        {
          path: "/user/:id/dashboard",
          name: "dashboard",
          component: () => import("../views/DashboardUser.vue"),
        },
        {
          path: "/user/reset-password",
          name: "reset-password",
          component: () => import("../views/users/ChangePasswordPage.vue"),
        },
        {
          path: "/users-management",
          name: "users-management",
          component: () => import("../views/users/UsersManagement.vue"),
        },
        {
          path: "/:catchAll(.*)",
          component: () => import("../views/NotFoundPage.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  const { isLogged } = useAuthStore();
  if (
    to.name !== "register" &&
    to.name !== "login" &&
    isLogged !== IsLogged.Logged
  ) {
    return { name: "login" };
  }
});

router.beforeEach((to) => {
  const { user } = useAuthStore();
  const toast = useToast();

  if (
    (to.name === "dashboard" || to.name === "profile") &&
    user?.rank === userRank.employee
  ) {
    toast.info("Vous n'avez pas le droit d'accéder a cette page");
    if (to.name === "profile") return { name: "myProfile" };
    return { name: "home" };
  }
});

export default router;

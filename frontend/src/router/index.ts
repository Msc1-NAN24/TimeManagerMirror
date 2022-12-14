import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import { IsLogged, useAuthStore } from "@/store/AuthStore";
import TeamListPage from "@/views/teams/TeamListPage.vue";
import TeamPage from "@/views/teams/TeamPage.vue";
import ProfilePage from "@/views/users/ProfilePage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
import UsersManagement from "@/views/users/UsersManagement.vue";
import ChangePasswordPage from "@/views/users/ChangePasswordPage.vue";
import DashboardUser from "@/views/DashboardUser.vue";
import WorkingTimes from "@/views/workingtimes/WorkingTimes.vue";
import WorkingTime from "@/views/workingtimes/WorkingTime.vue";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
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
          component: WorkingTime,
        },
        {
          strict: true,
          path: "/workingtimes/",
          name: "workingtimesMe",
          component: WorkingTimes,
        },
        {
          path: "/workingtimes/:userid",
          name: "workingtimes",
          component: WorkingTimes,
        },
        {
          path: "/teams",
          children: [
            {
              path: "",
              name: "teams",
              component: TeamListPage,
            },
            {
              path: ":id",
              name: "team",
              component: TeamPage,
            },
          ],
        },
        {
          path: "/user/profile",
          name: "myProfile",
          component: ProfilePage,
        },
        {
          path: "/user/:id/profile",
          name: "profile",
          component: ProfilePage,
        },
        {
          path: "/user/:id/dashboard",
          name: "dashboard",
          component: DashboardUser,
        },
        {
          path: "/user/reset-password",
          name: "reset-password",
          component: ChangePasswordPage,
        },
        {
          path: "/users-management",
          name: "users-management",
          component: UsersManagement,
        },
        {
          path: "/:catchAll(.*)",
          component: NotFoundPage,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundPage,
    },
  ],
});

router.beforeEach((to) => {
  const { isLogged, user } = useAuthStore();

  if (
    to.name !== "register" &&
    to.name !== "login" &&
    isLogged !== IsLogged.Logged
  ) {
    return { name: "login" };
  }
});

export default router;

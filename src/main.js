import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import TeamsList from "./components/teams/TeamsList.vue";
import UsersList from "./components/users/UsersList.vue";
import TeamMembers from "./components/teams/TeamMembers.vue";
import TeamsFooter from "./components/teams/TeamsFooter.vue";
import UsersFooter from "./components/users/UsersFooter.vue";

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/teams",
      name: "home",
      meta: { needsAuth: true },
    },
    {
      path: "/teams",
      components: {
        default: TeamsList,
        footer: TeamsFooter,
      },
      name: "teams",
      children: [
        {
          path: ":teamId",
          component: TeamMembers,
          props: true,
          name: "team-members",
        },
      ],
    },
    {
      path: "/users",
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
      name: "users",
      beforeEnter(to, from, next) {
        console.log("User beforeEnter");
        console.log(to, from);
        next();
      },
    },

    {
      path: "/:notFound(.*)",
      redirect: "/teams",
      props: true,
    },
  ],
  //   linkActiveClass: "active",
  scrollBehavior(to, from, postion) {
    if (postion) {
      return postion;
    }
    return { left: 0, top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  console.log("Global beforeEach");
  console.log(to, from);

  if (to.meta.needsAuth) {
    console.log("Needs auth");
  }
  next();

  //   next(false);
  //   next("/teams");
});

router.afterEach((to, from) => {
  // sending analytics data
  console.log("Global afterEach");
  console.log(to, from);
});

app.use(router);
app.mount("#app");

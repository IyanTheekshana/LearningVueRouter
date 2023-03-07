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
  next();
  //   next(false);
  //   next("/teams");
});

app.use(router);
app.mount("#app");

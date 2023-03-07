import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import TeamsList from "./components/teams/TeamsList.vue";
import UsersList from "./components/users/UsersList.vue";
import TeamMembers from "./components/teams/TeamMembers.vue";

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
      component: TeamsList,
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
      component: UsersList,
      name: "users",
    },

    {
      path: "/:notFound(.*)",
      redirect: "/teams",
      props: true,
    },
  ],
});

app.use(router);
app.mount("#app");

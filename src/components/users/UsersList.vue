<template>
  <button @click="onConfirm">Confirm</button>
  <button @click="onChange">Save Changes ({{ chagesSaved }})</button>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from "./UserItem.vue";

export default {
  components: {
    UserItem,
  },
  data() {
    return {
      chagesSaved: false,
    };
  },
  inject: ["users"],
  methods: {
    onConfirm() {
      //do something
      this.$router.push("/teams");
    },
    onChange() {
      this.chagesSaved = !this.chagesSaved;
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log("Userlist cmp beforeRouterEnter");
    console.log(to, from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("User's list beforeRouteLeave");
    console.log(to, from);

    if (this.chagesSaved) {
      next();
    } else {
      const ans = confirm(" are you sure?");
      next(ans);
    }
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>

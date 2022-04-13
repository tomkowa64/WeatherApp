<template>
  <router-view @authenticated="setAuthenticated" />
</template>

<style lang="scss">
@import "@/assets/style/default.sass";
</style>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Login from "@/views/Login.vue";

@Options({
  components: { Login },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
    },
  },
})
export default class App extends Vue {
  data() {
    return {
      authenticated: false,
      mockAccount: {
        username: "admin",
        password: "admin",
      },
    };
  }
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  }
}
</script>

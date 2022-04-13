<template>
  <div class="container-gradient">
    <div class="auth-form">
      <div class="form-header">
        <fa icon="cloud-sun" size="7x" :style="{ color: '#A9D7E8' }" />
        <h1 class="title">Weather App</h1>
        <h3 class="subtitle">Know your weather</h3>
      </div>
      <div class="form-input-group">
        <AuthFormInput>
          <template #label-name>Username</template>
          <template #prefix-icon>
            <fa icon="user" size="2x" :style="{ color: '#C4C4C4' }" />
          </template>
          <template #input-placeholder
            ><input
              placeholder="Type your username"
              name="username"
              v-model="input.username"
          /></template>
        </AuthFormInput>
        <AuthFormInput>
          <template #label-name>Password</template>
          <template #prefix-icon>
            <fa icon="lock" size="2x" :style="{ color: '#C4C4C4' }" />
          </template>
          <template #input-placeholder
            ><input
              placeholder="Type your password"
              type="password"
              name="password"
              v-model="input.password"
          /></template>
        </AuthFormInput>
        <div class="password-recovery">Forgot password?</div>
      </div>
      <div class="form-button-group">
        <div class="form-button-login" v-on:click="login()">LOGIN</div>
        <router-link to="/register">
          <div class="form-button-register">SIGN UP</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/style/auth.sass";
</style>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AuthFormInput from "@/components/AuthFormInput.vue";

@Options({
  components: { AuthFormInput },
  methods: {
    login() {
      if (this.input.username != "" && this.input.password != "") {
        if (
          this.input.username == this.$parent.$parent.mockAccount.username &&
          this.input.password == this.$parent.$parent.mockAccount.password
        ) {
          this.$emit("authenticated", true);
          this.$router.replace({ name: "home" });
        } else {
          console.log("The username and / or password is incorrect");
        }
      } else {
        console.log("A username and password must be present");
      }
    },
  },
})
export default class Login extends Vue {
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
    };
  }
}
</script>

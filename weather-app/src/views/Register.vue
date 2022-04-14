<template>
  <div class="container-gradient">
    <div class="auth-form">
      <div class="form-header">
        <fa icon="sun" size="7x" :style="{ color: '#e0da34' }" />
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
            ><input placeholder="Type your username"
          /></template>
        </AuthFormInput>
        <AuthFormInput>
          <template #label-name>Password</template>
          <template #prefix-icon>
            <fa icon="lock" size="2x" :style="{ color: '#C4C4C4' }" />
          </template>
          <template #input-placeholder
            ><input placeholder="Type your password" type="password"
          /></template>
        </AuthFormInput>
        <AuthFormInput>
          <template #label-name>Repeat Password</template>
          <template #prefix-icon>
            <fa icon="lock" size="2x" :style="{ color: '#C4C4C4' }" />
          </template>
          <template #input-placeholder
            ><input placeholder="Repeat your password" type="password"
          /></template>
        </AuthFormInput>
      </div>
      <div class="form-button-group">
        <router-link to="/">
          <div class="form-button-register">SIGN UP</div>
        </router-link>
        <router-link to="/">
          <div class="form-button-login">BACK</div>
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
})
export default class Register extends Vue {}
</script>

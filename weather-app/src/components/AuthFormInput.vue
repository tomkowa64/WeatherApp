<template>
  <div>
    <div class="label"><slot name="label-name"></slot></div>
    <div class="form-input">
      <div class="prefix">
        <slot name="prefix-icon"></slot>
      </div>
      <div class="input-value">
        <slot name="input-placeholder"></slot>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/style/auth.sass";
</style>
<script lang="ts">
import { Vue } from "vue-class-component";

export default class AuthFormInput extends Vue {}
</script>

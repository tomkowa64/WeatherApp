<template>
  <div class="square">
    <!-- active -->
    <div class="time"><slot name="time"></slot></div>
    <div class="details">
      <div class="icon">
        <slot name="icon"></slot>
      </div>
      <div class="temperature">
        <div class="actual-temperature">
          <slot name="actual-temperature"></slot>
        </div>
        <div class="feels-like"><slot name="feels-like"></slot></div>
      </div>
    </div>
    <div class="short-desc"><slot name="short-desc"></slot></div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/style/default.sass";
@import "@/assets/style/home.sass";
</style>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

export default class WeatherDataSquare extends Vue {}
</script>

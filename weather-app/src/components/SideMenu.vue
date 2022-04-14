<template>
  <div class="side-menu">
    <div class="find-location-input">
      <input placeholder="Find location" />
      <fa
        icon="magnifying-glass"
        size="2x"
        :style="{ color: 'hsla(0,0%,100%,0.5)' }"
      />
    </div>
    <div class="city-list">
      <p class="active">Rzeszów</p>
      <p>Rzym</p>
      <p>Berlin</p>
      <p>Warszawa</p>
      <p>Berlin</p>
    </div>
    <div class="current-city-details">
      <p class="active">Weather Details</p>
      <div class="detail">
        <div class="key">Temperature</div>
        <div class="value">75 °F</div>
      </div>
      <div class="detail">
        <div class="key">Humidity</div>
        <div class="value">100</div>
      </div>
      <div class="detail">
        <div class="key">Pressure</div>
        <div class="value">1000 hPa</div>
      </div>
      <div class="detail">
        <div class="key">Wind speed</div>
        <div class="value">1.5 m/s</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "@/assets/style/home.sass";
</style>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

export default class SideMenu extends Vue {}
</script>

<template>
  <div class="side-menu" v-bind:class="{ display: isDisplay }">
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
      <p>
        Rzym
        <fa
          icon="multiply"
          size="1x"
          :style="{
            color: '#FFF',
          }"
        />
      </p>
      <p>
        Berlin
        <fa
          icon="multiply"
          size="1x"
          :style="{
            color: '#FFF',
          }"
        />
      </p>
      <p>
        Warszawa
        <fa
          icon="multiply"
          size="1x"
          :style="{
            color: '#FFF',
          }"
        />
      </p>
      <p>
        Berlin
        <fa
          icon="multiply"
          size="1x"
          :style="{
            color: '#FFF',
          }"
        />
      </p>
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

export default class SideMenu extends Vue {
  isDisplay = false;
}
</script>

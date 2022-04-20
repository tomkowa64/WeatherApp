<template>
  <div class="side-menu">
    <SearchInput />
    <div class="city-list">
      <p v-for="city in $parent.favorites" :key="city.id">
        <a
          :class="{ active: city.id === $parent.activeCity.id }"
          @click="this.$parent.changeContent(city)"
        >
          {{ city.name }}
        </a>
        <fa
          @click="$parent.deleteCity(city)"
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
<script setup lang="ts">
import { defineProps } from "vue-class-component";

defineProps<{
  activeCity: City;
}>();
</script>
<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { City } from "@/models/City";
import { useStore, ActionTypes, MutationTypes } from "@/store";
import SearchInput from "@/components/SearchInput.vue";

export default class SideMenu extends Vue {}
</script>

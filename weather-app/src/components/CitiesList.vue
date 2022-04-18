<template>
  <p v-for="city in favorites" :key="city.id">
    <a
      :class="{ active: city.id === activeCityId }"
      @click="$parent.makeActive(city)"
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
</template>

<script setup lang="ts">
defineProps<{
  favorites: City[];
  activeCityId: number;
}>();
</script>

<style lang="sass">
a
    cursor: pointer
.active
    color: red !important
</style>

<script lang="ts">
import { Options, Vue, defineProps } from "vue-class-component";
import { City } from "@/models/City";

export default class CitiesList extends Vue {}
</script>

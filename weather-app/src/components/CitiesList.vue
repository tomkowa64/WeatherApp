<template>
  <p v-for="city in favorites" :key="city.id">
    {{ city.name }}
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
}>();
</script>

<script lang="ts">
import { Options, Vue, defineProps } from "vue-class-component";
import { City } from "@/models/City";

export default class CitiesList extends Vue {}
</script>

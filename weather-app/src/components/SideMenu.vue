<template>
  <div class="side-menu">
    <SearchInput />
    <div class="city-list">
      <p v-for="city in this.$store.state.favorites" :key="city">
        <a
          :class="{ active: city.id === $parent.store.state.activeCity.id }"
          @click="this.$parent.changeContent(city)"
        >
          {{ city.name }}
        </a>
        <fa
          @click="
            $parent.deleteCity(city);
            $parent.setBackground();
          "
          icon="multiply"
          size="1x"
          :style="{
            color: '#FFF',
          }"
        />
      </p>
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
import { Vue } from "vue-class-component";
import { City } from "@/models/City";
import SearchInput from "@/components/SearchInput.vue";
export default class SideMenu extends Vue {}
</script>

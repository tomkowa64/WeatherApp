<template>
  <div>
    <div class="city-name">{{ name }}</div>
    <div class="city-temp">
      <fa
        icon="cloud-sun"
        size="7x"
        :style="{
          color: '#FFF',
        }"
      />
      <div class="temp-value">{{ $parent.caclculateCelsius(temp) }} °C</div>
    </div>
    <div class="short-desc">{{ desc }}</div>
    <!--<div class="last-update">Last update <b>13:01</b></div>-->
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue-class-component";

defineProps<{
  name: string;
  temp: number;
  desc: string;
}>();
</script>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

export default class CityDetails extends Vue {}
</script>

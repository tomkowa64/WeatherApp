<template>
  <div class="details">
    <div class="general-informations">
      <div class="city-name">{{ name }}</div>
      <div class="city-temp">
        <fa
          icon="cloud-sun"
          size="7x"
          :style="{
            color: '#FFF',
          }"
        />
        <div class="temp-value">{{ $parent.caclculateCelsius(temp) }}°C</div>
      </div>
      <div class="short-desc">{{ desc }}</div>
    </div>
    <!--<div class="last-update">Last update <b>13:01</b></div>-->
    <div class="weather-props">
      <div>
        <fa
          icon="temperature-full"
          size="1x"
          :style="{
            color: '#FFF',
          }"
        />
        {{
          $parent.caclculateCelsius($parent.currentWeather.main.feels_like)
        }}°C (Feels like)
      </div>
      <div>
        <fa
          icon="angles-down"
          size="1x"
          :style="{
            color: '#FFF',
          }"
        />
        {{ $parent.currentWeather.main.pressure }} hPa
      </div>
      <div>
        <fa
          icon="wind"
          size="1x"
          :style="{
            color: '#FFF',
          }"
        />
        {{ $parent.currentWeather.wind.speed }} m/s
      </div>
      <div>
        <fa
          icon="droplet"
          size="1x"
          :style="{
            color: '#FFF',
          }"
        />
        {{ $parent.currentWeather.main.humidity }}%
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, withDefaults } from "vue-class-component";

interface Props {
  name: string;
  temp: number;
  desc: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: "Example",
  temp: 0,
  desc: "Text",
});
</script>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { City } from "@/models/City";
import { ActionTypes, MutationTypes } from "@/store";
export default class CityDetails extends Vue {}
</script>

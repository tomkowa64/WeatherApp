<template>
  <div class="forecast-section">
    <div class="title">Hourly</div>
    <div class="square-list">
      <WeatherDataSquare
        :class="{ active: index === 0 }"
        v-for="(item, index) in forecast.hourly.slice(0, 6)"
        :key="item"
      >
        <template #time>
          {{ $parent.getCurrHour($parent.currentDate, index)[0] }}:00
        </template>
        <template #icon>
          <fa
            icon="sun"
            size="4x"
            :style="{
              color: '#E1DC5B',
            }"
          />
        </template>
        <template #actual-temperature
          >{{ $parent.caclculateCelsius(item.temp) }}°C</template
        >
        <template #feels-like
          >{{ $parent.caclculateCelsius(item.feels_like) }}°C</template
        >
        <template #short-desc>{{ item.weather[0].description }}</template>
      </WeatherDataSquare>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, withDefaults } from "vue-class-component";

interface Props {
  forecast: Forecast;
}

const props = withDefaults(defineProps<Props>(), {
  forecast: {} as Forecast,
});
</script>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import WeatherDataSquare from "@/components/WeatherDataSquare.vue";
import { Forecast } from "@/models/Forecast";

export default class CityHourlyForecast extends Vue {}
</script>

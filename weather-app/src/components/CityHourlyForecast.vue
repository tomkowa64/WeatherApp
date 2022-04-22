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
            v-if="$parent.show(item.weather[0].description) === 'sun'"
            icon="sun"
            size="4x"
            :style="{ color: '#E1DC5B' }"
          />
          <fa
            v-if="$parent.show(item.weather[0].description) === 'rain'"
            icon="cloud-rain"
            size="4x"
            :style="{ color: 'rgb(91, 150, 225)' }"
          />
          <fa
            v-if="$parent.show(item.weather[0].description) === 'clouds'"
            icon="cloud"
            size="4x"
            :style="{ color: 'rgb(179, 179, 179)' }"
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
import { Vue } from "vue-class-component";
import WeatherDataSquare from "@/components/WeatherDataSquare.vue";
import { Forecast } from "@/models/Forecast";

export default class CityHourlyForecast extends Vue {}
</script>

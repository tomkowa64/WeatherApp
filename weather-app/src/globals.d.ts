import WeatherService from "@/services/WeatherService";
import Vue from "vue";

declare module "@vue/runtime-core" {
  // provide typings for services
  interface ComponentCustomProperties {
    $weatherService: WeatherService;
  }
}

<template>
  <div class="home" :class="checkState() ? 'blank' : 'sunny'">
    <SideMenu :activeCity="this.activeCity" />
    <div class="city-content">
      <div
        class="empty-information"
        v-if="this.store.state.favorites.length == 0"
      >
        <fa
          icon="cloud-sun-rain"
          size="4x"
          :style="{
            color: 'hsla(197deg, 46.7%, 14.7%, 0.67)',
          }"
        />
        Add favorite city to observe weather
      </div>
      <CityDetails
        v-if="this.store.state.favorites.length > 0"
        :name="this.currentWeather.name"
        :temp="this.currentWeather.main.temp"
        :desc="this.currentWeather.weather[0].description"
      />
      <!-- DAILY -->
      <CityDailyForecast
        :forecast="this.forecast"
        v-if="this.store.state.favorites.length > 0"
      />
      <!-- HOURLY -->
      <CityHourlyForecast
        :forecast="this.forecast"
        v-if="this.store.state.favorites.length > 0"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/style/default.sass";
@import "@/assets/style/home.sass";

.blank {
  background: #fff;
}
.sunny {
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url("@/assets/images/bg.jpg") no-repeat center center fixed cover;
}
</style>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SideMenu from "@/components/SideMenu.vue";
import CityDetails from "@/components/CityDetails.vue";
import CityDailyForecast from "@/components/CityDailyForecast.vue";
import CityHourlyForecast from "@/components/CityHourlyForecast.vue";
import { useStore, ActionTypes, MutationTypes } from "@/store";
import { City } from "@/models/City";
import { CurrentWeather } from "@/models/CurrentWeather";
import { Forecast } from "@/models/Forecast";

@Options({
  components: { SideMenu, CityDetails, CityDailyForecast, CityHourlyForecast },
})
export default class Home extends Vue {
  //Vuex Store
  store = useStore();

  //Props
  private favorites: City[] = [];
  private activeCity?: City = {} as City;
  private currentWeather?: CurrentWeather = {} as CurrentWeather;
  private forecast?: Forecast = {} as Forecast;
  private currentDate: Date = new Date();
  //Load Methods
  public async data(): Promise<void> {
    await this.loadData();
  }

  public async getCurrentWeather(city: City): Promise<CurrentWeather> {
    return (
      await this.axios.get<CurrentWeather>(
        process.env.VUE_APP_API_CURR_WEATHER +
          `/weather?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=` +
          process.env.VUE_APP_NOT_SECRET_KEY
      )
    ).data;
  }

  public async getForecast(city: City): Promise<Forecast> {
    return (
      await this.axios.get<Forecast>(
        process.env.VUE_APP_API_ONE_CALL +
          `?lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=&appid=` +
          process.env.VUE_APP_NOT_SECRET_KEY
      )
    ).data;
  }

  public async changeContent(city: City) {
    try {
      this.activeCity = city;
      this.currentWeather = await this.getCurrentWeather(this.activeCity);
      this.forecast = await this.getForecast(this.activeCity);
      console.log(this.currentWeather);
    } catch {
      console.log("err");
    }
  }
  public deleteCity = (city: City) => {
    this.store.commit(MutationTypes.REMOVE_FAVORITE, city);
  };

  public caclculateCelsius(temp: number): number {
    return Math.round(temp - 273.15);
  }

  public checkState(): boolean {
    if (this.store.state.favorites.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  public getCurrDate(startDate: Date, index: number): string[] {
    let days: string[] = [];
    let currentDate = new Date();
    currentDate.setDate(startDate.getDate() + index);
    days.push(
      currentDate.toLocaleDateString("en-us", {
        weekday: "long",
        day: "numeric",
      })
    );
    return days;
  }

  public getCurrHour(startDate: Date, index: number): number[] {
    let hours = [];
    let currentDate = new Date();
    // eslint-disable-next-line prettier/prettier
    currentDate.setTime(currentDate.getTime() + index * 60 * 60 * 1000);
    let currentHour = currentDate.getHours();
    hours.push(currentHour);
    return hours;
  }

  private async loadData(): Promise<void> {
    try {
      this.favorites = await this.store.state.favorites;
      this.activeCity = await this.favorites[0];
      this.currentWeather = await this.getCurrentWeather(this.activeCity);
      this.forecast = await this.getForecast(this.activeCity);
      console.log("curr");
      console.log(this.currentWeather);
      console.log("forecast");
      console.log(this.forecast);
    } catch {
      console.log("API init error");
    }
  }
}
</script>

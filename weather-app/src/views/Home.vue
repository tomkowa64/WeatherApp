<template>
  <div class="home" :class="setBackground()">
    <SideMenu :activeCity="this.store.state.activeCity" />
    <div class="city-content">
      <div
        class="empty-information"
        v-if="this.store.state.favorites.length == 0"
      >
        <fa
          icon="cloud-sun-rain"
          size="4x"
          :style="{
            color: 'hsla(196.7, 89.6%, 18.8%, 0.93)',
          }"
        />
        Add favorite city to observe weather
      </div>
      <CityDetails
        v-if="this.store.state.favorites.length > 0 && currentWeather !== {}"
        :name="currentWeather.name"
        :temp="currentWeather.main.temp"
        :desc="currentWeather.weather[0].description"
      />
      <!-- DAILY -->
      <CityDailyForecast
        v-if="this.store.state.favorites.length > 0 && currentWeather !== {}"
        :forecast="this.forecast"
      />
      <!-- HOURLY -->
      <CityHourlyForecast
        v-if="this.store.state.favorites.length > 0 && currentWeather !== {}"
        :forecast="this.forecast"
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
.sun {
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url("@/assets/images/bg.jpg") no-repeat center center fixed;
  background-size: cover;
}

.rain {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("@/assets/images/rain.jpg") no-repeat center center fixed;
  background-size: cover;
}

.clouds {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("@/assets/images/clouds.jpg") no-repeat center center fixed;
  background-size: cover;
}

.storm {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("@/assets/images/storm.jpg") no-repeat center center fixed;
  background-size: cover;
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
import { mockCurrentWeather } from "@/mock/mockCurrentWeather";
import { mockForecast } from "@/mock/mockForecast";
@Options({
  components: { SideMenu, CityDetails, CityDailyForecast, CityHourlyForecast },
})
export default class Home extends Vue {
  //Vuex Store
  store = useStore();

  //Props
  private favorites: City[] = [];
  private currentWeather: CurrentWeather = mockCurrentWeather;
  private forecast: Forecast = mockForecast;
  private currentDate: Date = new Date();
  private currrentBg = "sun";
  private lastUpdate = this.getCurrHourAndMinutes();
  //Load Methods
  public async data(): Promise<void> {
    await this.loadData();
  }
  public mounted() {
    setInterval(() => {
      this.changeContent(this.store.state.activeCity);
      this.lastUpdate = this.getCurrHourAndMinutes();
    }, 60000);
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
      this.store.commit(MutationTypes.SET_ACTIVE, city);
      this.currentWeather = await this.getCurrentWeather(
        this.store.state.activeCity
      );
      this.forecast = await this.getForecast(this.store.state.activeCity);
      console.log(this.currentWeather);
    } catch {
      console.log("err");
    }
  }
  public deleteCity = (city: City) => {
    if (this.store.state.activeCity === city) {
      this.store.commit(MutationTypes.REMOVE_FAVORITE, city);
      this.store.commit(MutationTypes.SET_ACTIVE, this.favorites[0]);
      this.changeContent(this.favorites[0]);
    } else {
      this.store.commit(MutationTypes.REMOVE_FAVORITE, city);
    }

    if (this.store.state.favorites.length === 0) {
      this.forecast = mockForecast;
      this.currentWeather = mockCurrentWeather;
    }
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

  public getCurrHourAndMinutes(): string {
    const now = new Date();
    const current = now.getHours() + ":" + now.getMinutes();
    return current;
  }

  public show(propsReturnedValue: string): string {
    if (propsReturnedValue.includes("clear")) {
      return "sun";
    } else if (
      propsReturnedValue.includes("rain") ||
      propsReturnedValue.includes("drizz")
    ) {
      return "rain";
    } else if (propsReturnedValue.includes("clouds")) {
      return "clouds";
    } else if (propsReturnedValue.includes("sun")) {
      return "sun";
    } else if (propsReturnedValue.includes("storm")) {
      return "storm";
    } else {
      return "sun";
    }
  }

  public setBackground(): string {
    if (this.currentWeather.weather[0].description.includes("clear")) {
      return "sun";
    } else if (this.currentWeather.weather[0].description.includes("rain")) {
      return "rain";
    } else if (this.currentWeather.weather[0].description.includes("clouds")) {
      return "clouds";
    } else if (this.currentWeather.weather[0].description.includes("sun")) {
      return "sun";
    } else if (this.currentWeather.weather[0].description.includes("drizz")) {
      return "rain";
    } else if (this.currentWeather.weather[0].description.includes("")) {
      return "blank";
    } else {
      return "blank";
    }
  }

  private async loadData(): Promise<void> {
    try {
      if (this.store.state.favorites.length === 0) {
        this.store.getters.favoritesList;
        this.favorites = await this.store.state.favorites;
      } else {
        this.favorites = await this.store.state.favorites;
      }
      this.store.commit(MutationTypes.SET_ACTIVE, this.favorites[0]);
      this.currentWeather = await this.getCurrentWeather(
        this.store.state.activeCity
      );
      this.forecast = await this.getForecast(this.store.state.activeCity);
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

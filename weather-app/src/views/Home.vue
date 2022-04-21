<template>
  <div class="home" :class="checkState() ? 'blank' : 'sunny'">
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
            color: 'hsla(197deg, 46.7%, 14.7%, 0.67)',
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
  private currentWeather: CurrentWeather = {
    coord: {
      lon: 0,
      lat: 0,
    },
    weather: [
      {
        id: 0,
        main: "",
        description: "",
        icon: "",
      },
    ],

    base: "",
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
    },
    visibility: 0,
    wind: {
      speed: 0,
      deg: 0,
    },
    clouds: {
      all: 0,
    },
    dt: 0,
    sys: {
      type: 0,
      id: 0,
      message: 0,
      country: "",
      sunrise: 0,
      sunset: 0,
    },
    timezone: 0,
    id: 0,
    name: "",
    cod: 0,
  };
  private forecast: Forecast = {
    lat: 0,
    lon: 0,
    timezone: "",
    timezone_offset: 0,
    current: {
      dt: 0,
      sunrise: 0,
      sunset: 0,
      temp: 0,
      feels_like: 0,
      pressure: 0,
      humidity: 0,
      dew_point: 0,
      uvi: 0,
      clouds: 0,
      visibility: 0,
      wind_speed: 0,
      wind_deg: 0,
      weather: [
        {
          id: 0,
          main: "",
          description: "",
          icon: "",
        },
      ],
      rain: {
        h: "",
      },
    },
    minutely: [
      {
        dt: 0,
        precipitation: 0,
      },
    ],
    hourly: [
      {
        dt: 0,
        temp: 0,
        feels_like: 0,
        pressure: 0,
        humidity: 0,
        dew_point: 0,
        uvi: 0,
        clouds: 0,
        visibility: 0,
        wind_speed: 0,
        wind_deg: 0,
        wind_gust: 0,
        weather: [
          {
            id: 0,
            main: "",
            description: "",
            icon: "",
          },
        ],
        pop: 0,
      },
    ],
    daily: [
      {
        dt: 0,
        sunrise: 0,
        sunset: 0,
        moonrise: 0,
        moonset: 0,
        moon_phase: 0,
        temp: {
          day: 0,
          min: 0,
          max: 0,
          night: 0,
          eve: 0,
          morn: 0,
        },
        feels_like: {
          day: 0,
          night: 0,
          eve: 0,
          morn: 0,
        },
        pressure: 0,
        humidity: 0,
        dew_point: 0,
        wind_speed: 0,
        wind_deg: 0,
        weather: [
          {
            id: 0,
            main: "",
            description: "",
            icon: "",
          },
        ],
        clouds: 0,
        pop: 0,
        rain: 0,
        uvi: 0,
      },
    ],
    alerts: [
      {
        sender_name: "",
        event: "",
        start: 0,
        end: 0,
        description: "",
        tags: [""],
      },
    ],
  };

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

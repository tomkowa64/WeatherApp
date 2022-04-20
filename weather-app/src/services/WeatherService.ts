import { CurrentWeather } from "@/models/CurrentWeather";
import axios, { AxiosStatic } from "axios";
import VueAxios from "vue-axios";
import { City } from "@/models/City";

export default class WeatherService {
  private axios: AxiosStatic;

  constructor(axios: AxiosStatic) {
    this.axios = axios;
  }

  public async getCurrentWeather(city: City): Promise<CurrentWeather> {
    console.log("123");
    return (
      await this.axios.get<CurrentWeather>(
        `/weather?lat=${city.coord.lat}&lon=${city.coord.lon}`
      )
    ).data;
  }
}

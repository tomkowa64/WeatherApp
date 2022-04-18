<template>
  <div class="home">
    <SideMenu />
    <div class="city-content">
      <div class="city-name">Rzeszów</div>
      <div class="city-temp">
        <fa
          icon="cloud-sun"
          size="7x"
          :style="{
            color: '#FFF',
          }"
        />
        <div class="temp-value">75 °F</div>
      </div>
      <div class="short-desc">Partly Sunny</div>
      <div class="last-update">Last update <b>13:01</b></div>
      <!-- DAILY -->
      <div class="forecast-section">
        <div class="title">Daily</div>
        <div class="square-list">
          <WeatherDataSquare v-bind:class="{ active: true }">
            <template #time>Thu 14</template>
            <template #icon>
              <fa
                icon="sun"
                size="4x"
                :style="{
                  color: '#E1DC5B',
                }"
              />
            </template>
            <template #actual-temperature>67°</template>
            <template #feels-like>65°</template>
            <template #short-desc>Mostly sunny</template>
          </WeatherDataSquare>
          <WeatherDataSquare>
            <template #time>Wed 15</template>
            <template #icon>
              <fa
                icon="cloud"
                size="4x"
                :style="{
                  color: '#85C1E2',
                }"
              />
            </template>
            <template #actual-temperature>67°</template>
            <template #feels-like>65°</template>
            <template #short-desc>Cloudy</template>
          </WeatherDataSquare>
          <WeatherDataSquare>
            <template #time>Thu 16</template>
            <template #icon>
              <fa
                icon="cloud"
                size="4x"
                :style="{
                  color: '#85C1E2',
                }"
              />
            </template>
            <template #actual-temperature>64°</template>
            <template #feels-like>67°</template>
            <template #short-desc>Cloudy</template>
          </WeatherDataSquare>
          <WeatherDataSquare>
            <template #time>Fri 17</template>
            <template #icon>
              <fa
                icon="cloud"
                size="4x"
                :style="{
                  color: '#85C1E2',
                }"
              />
            </template>
            <template #actual-temperature>67°</template>
            <template #feels-like>67°</template>
            <template #short-desc>Cloudy</template>
          </WeatherDataSquare>
          <WeatherDataSquare>
            <template #time>Sat 18</template>
            <template #icon>
              <fa
                icon="sun"
                size="4x"
                :style="{
                  color: '#E1DC5B',
                }"
              />
            </template>
            <template #actual-temperature>67°</template>
            <template #feels-like>65°</template>
            <template #short-desc>Mostly sunny</template>
          </WeatherDataSquare>
          <WeatherDataSquare>
            <template #time>Sun 19</template>
            <template #icon>
              <fa
                icon="sun"
                size="4x"
                :style="{
                  color: '#E1DC5B',
                }"
              />
            </template>
            <template #actual-temperature>67°</template>
            <template #feels-like>65°</template>
            <template #short-desc>Mostly sunny</template>
          </WeatherDataSquare>
          <WeatherDataSquare>
            <template #time>Mon 14</template>
            <template #icon>
              <fa
                icon="cloud-rain"
                size="4x"
                :style="{
                  color: '#5096FF',
                }"
              />
            </template>
            <template #actual-temperature>67°</template>
            <template #feels-like>65°</template>
            <template #short-desc>Rainy</template>
          </WeatherDataSquare>
        </div>
      </div>
      <!-- HOURLY -->
      <div class="forecast-section">
        <div class="title">Hourly</div>
        <div class="square-list">
          <WeatherDataSquare v-bind:class="{ active: true }">
            <template #time>14:00</template>
            <template #icon>
              <fa
                icon="sun"
                size="4x"
                :style="{
                  color: '#E1DC5B',
                }"
              />
            </template>
            <template #actual-temperature>67°</template>
            <template #feels-like>65°</template>
            <template #short-desc>Mostly sunny</template>
          </WeatherDataSquare>
          <WeatherDataSquare>
            <template #time>15:00</template>
            <template #icon>
              <fa
                icon="cloud"
                size="4x"
                :style="{
                  color: '#85C1E2',
                }"
              />
            </template>
            <template #actual-temperature>67°</template>
            <template #feels-like>65°</template>
            <template #short-desc>Cloudy</template>
          </WeatherDataSquare>
          <WeatherDataSquare>
            <template #time>16:00</template>
            <template #icon>
              <fa
                icon="cloud"
                size="4x"
                :style="{
                  color: '#85C1E2',
                }"
              />
            </template>
            <template #actual-temperature>64°</template>
            <template #feels-like>67°</template>
            <template #short-desc>Cloudy</template>
          </WeatherDataSquare>
          <WeatherDataSquare>
            <template #time>17:00</template>
            <template #icon>
              <fa
                icon="cloud"
                size="4x"
                :style="{
                  color: '#85C1E2',
                }"
              />
            </template>
            <template #actual-temperature>67°</template>
            <template #feels-like>67°</template>
            <template #short-desc>Cloudy</template>
          </WeatherDataSquare>
          <WeatherDataSquare>
            <template #time>18:00</template>
            <template #icon>
              <fa
                icon="cloud"
                size="4x"
                :style="{
                  color: '#85C1E2',
                }"
              />
            </template>
            <template #actual-temperature>67°</template>
            <template #feels-like>65°</template>
            <template #short-desc>Cloudy</template>
          </WeatherDataSquare>
          <WeatherDataSquare>
            <template #time>19:00</template>
            <template #icon>
              <fa
                icon="cloud"
                size="4x"
                :style="{
                  color: '#85C1E2',
                }"
              />
            </template>
            <template #actual-temperature>67°</template>
            <template #feels-like>65°</template>
            <template #short-desc>Cloudy</template>
          </WeatherDataSquare>
          <WeatherDataSquare>
            <template #time>19:00</template>
            <template #icon>
              <fa
                icon="cloud"
                size="4x"
                :style="{
                  color: '#85C1E2',
                }"
              />
            </template>
            <template #actual-temperature>67°</template>
            <template #feels-like>65°</template>
            <template #short-desc>Cloudy</template>
          </WeatherDataSquare>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/style/default.sass";
@import "@/assets/style/home.sass";
</style>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SideMenu from "@/components/SideMenu.vue";
import WeatherDataSquare from "@/components/WeatherDataSquare.vue";

@Options({
  components: { SideMenu, WeatherDataSquare },
})
export default class Home extends Vue {}
</script>

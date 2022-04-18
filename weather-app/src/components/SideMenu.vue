<template>
  <div class="side-menu" v-bind:class="{ display: isDisplay }">
    <div class="find-location-input">
      <input
        type="text"
        id="search"
        placeholder="Find location"
        v-model="context.searchTerm"
      />
      <fa
        icon="magnifying-glass"
        size="2x"
        :style="{ color: 'hsla(0,0%,100%,0.5)' }"
      />
    </div>
    <ul v-if="context.searchCities.length" class="search-hints">
      <li
        v-for="city in context.searchCities"
        :key="city.name"
        @click="context.selectCity(city)"
      >
        {{ city.name }}, {{ city.country }}
      </li>
    </ul>
    <div class="city-list">
      <p class="active">Rzeszów</p>
      <CitiesList :favorites="this.favorites" />
    </div>
    <div class="current-city-details">
      <p class="active">Weather Details</p>
      <div class="detail">
        <div class="key">Temperature</div>
        <div class="value">75 °F</div>
      </div>
      <div class="detail">
        <div class="key">Humidity</div>
        <div class="value">100</div>
      </div>
      <div class="detail">
        <div class="key">Pressure</div>
        <div class="value">1000 hPa</div>
      </div>
      <div class="detail">
        <div class="key">Wind speed</div>
        <div class="value">1.5 m/s</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "@/assets/style/home.sass";
</style>
<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { ref, computed, watch, reactive } from "vue";
import cities from "@/assets/data/city.list.json"; //Change to min in final version
import { City } from "@/models/City";
import CitiesList from "@/components/CitiesList.vue";
import { useStore, ActionTypes, MutationTypes } from "@/store";

@Options({
  components: { CitiesList },
})
export default class SideMenu extends Vue {
  //Vuex Store
  store = useStore();

  //Props
  private favorites: City[] = [];

  public async data(): Promise<void> {
    await this.loadData();
  }

  private async loadData(): Promise<void> {
    this.favorites = await this.store.state.favorites;
    console.log(this.favorites);
  }

  public deleteCity = (city: City) => {
    this.store.commit(MutationTypes.REMOVE_FAVORITE, city);
  };

  context = setup(() => {
    let searchTerm = ref("");

    const searchCities = computed(() => {
      if (searchTerm.value === "") {
        return [];
      }

      let matches = 0;
      return cities.filter((city: City) => {
        if (
          city.name.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
          matches < 5
        ) {
          matches++;
          return city;
        }
      });
    });

    const selectCity = (city: City) => {
      this.store.commit(MutationTypes.ADD_FAVORITE, city);
      selectedCity.value = city.name;
      searchTerm.value = "";
    };

    const deleteCity = (city: City) => {
      this.store.commit(MutationTypes.REMOVE_FAVORITE, city);
    };

    let selectedCity = ref("");

    return {
      cities,
      searchTerm,
      searchCities,
      selectCity,
      selectedCity,
    };
  });
}
</script>

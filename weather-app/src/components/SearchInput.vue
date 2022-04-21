<template>
  <div class="find-input">
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
        :key="city.id"
        @click="
          context.selectCity(city);
          $parent.$parent.changeContent(city);
        "
      >
        {{ city.name }}, {{ city.country }}
      </li>
    </ul>
  </div>
</template>
<style lang="sass">
.find-input
    width: 100%
</style>
<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import cities from "@/assets/data/city.list.min.json";
import { ref, computed, watch, reactive } from "vue";
import { City } from "@/models/City";
import { useStore, ActionTypes, MutationTypes } from "@/store";

export default class SearchInput extends Vue {
  store = useStore();
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
      if (this.store.state.favorites.length === 0) {
        this.store.commit(MutationTypes.ADD_FAVORITE, city);
        this.store.commit(MutationTypes.SET_ACTIVE, city);
      } else {
        this.store.commit(MutationTypes.ADD_FAVORITE, city);
      }
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

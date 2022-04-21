import {
  ActionContext,
  ActionTree,
  CommitOptions,
  createStore,
  DispatchOptions,
  GetterTree,
  MutationTree,
  Store as VuexStore,
} from "vuex";
import { City } from "@/models/City";
import createPersistedState from "vuex-persistedstate";

export type State = { favorites: Array<City>; activeCity: City };

const state: State = { favorites: [], activeCity: {} as City };

// mutations and action
export enum MutationTypes {
  ADD_FAVORITE = "SET_FAVORITE",
  REMOVE_FAVORITE = "REMOVE_FAVORITE",
  SET_ACTIVE = "SET_ACTIVE",
}

export enum ActionTypes {
  ADD_FAVORITE = "SET_FAVORITE",
  REMOVE_FAVORITE = "REMOVE_FAVORITE",
  SET_ACTIVE = "SET_ACTIVE",
}

//define mutatations
const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.ADD_FAVORITE](state: State, payload: City) {
    if (!state.favorites.some((e) => e.id === payload.id)) {
      state.favorites.push(payload);
    }
  },
  [MutationTypes.REMOVE_FAVORITE](state: State, payload: City) {
    state.favorites.splice(state.favorites.indexOf(payload), 1);
  },
  [MutationTypes.SET_ACTIVE](state: State, payload: City) {
    state.activeCity = payload;
  },
};

//Mutation Types
export type Mutations<S = State> = {
  [MutationTypes.ADD_FAVORITE](state: S, payload: City): void;
  [MutationTypes.REMOVE_FAVORITE](state: S, payload: City): void;
  [MutationTypes.SET_ACTIVE](state: S, payload: City): void;
};

//actions
type AugumentedACtionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

//actions interface
export interface Actions {
  [ActionTypes.ADD_FAVORITE](
    { commit }: AugumentedACtionContext,
    payload: City
  ): void;
  [ActionTypes.REMOVE_FAVORITE](
    { commit }: AugumentedACtionContext,
    payload: City
  ): void;
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.ADD_FAVORITE]({ commit }, payload: City) {
    commit(MutationTypes.ADD_FAVORITE, payload);
  },
  [ActionTypes.REMOVE_FAVORITE]({ commit }, payload: City) {
    commit(MutationTypes.REMOVE_FAVORITE, payload);
  },
  [ActionTypes.SET_ACTIVE]({ commit }, payload: City) {
    commit(MutationTypes.SET_ACTIVE, payload);
  },
};

//Getters types
export type Getters = {
  favoritesList(state: State): City[];
  getActiveCity(state: State): City;
};

//getters
export const getters: GetterTree<State, State> & Getters = {
  favoritesList: (state) => {
    return state.favorites;
  },
  getActiveCity: (state) => {
    return state.activeCity;
  },
};

//setup store type
export type Store = Omit<
  VuexStore<State>,
  "commit" | "getters" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

export const store = createStore({
  state,
  mutations,
  actions,
  plugins: [createPersistedState()],
});

export function useStore() {
  return store as Store;
}
/*
export const store = createStore({
  state,
  mutations: {
    addFavorite(state, payload) {
      state.favorites.push(payload);
    },
  },
  actions: {
    addFavorite({ commit }) {
      commit("Add to favorite");
    },
  },
  getters: {
    favorites(state) {
      return state.favorites;
    },
  },
});
*/

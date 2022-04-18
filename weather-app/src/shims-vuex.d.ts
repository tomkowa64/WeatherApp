// vuex.d.ts
import { Store } from "vuex";
import { State } from "@/store";
import { City } from "@/models/City";

declare module "@vue/runtime-core" {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

/*
declare module "vuex" {
  export function useStore(key?: string): Store<State>;
}
*/

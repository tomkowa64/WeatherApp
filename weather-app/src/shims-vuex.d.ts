import { Store } from "@/store";
import { City } from "@/models/City";

declare module "@vue/runtime-core" {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store;
  }
}

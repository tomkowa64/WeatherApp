import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "@/store";
import axios from "axios";
import VueAxios from "vue-axios";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import specific icons */
import { fas } from "@fortawesome/free-solid-svg-icons";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* add icons to the library */
library.add(fas);

createApp(App)
  .use(router)
  .use(store)
  .use(VueAxios, axios)
  .component("fa", FontAwesomeIcon)
  .mount("#app");

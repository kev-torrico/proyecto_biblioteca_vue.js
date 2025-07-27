import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";
import VueAxios from "vue-axios";

createApp(App).use(store).use(router).use(VueAxios, axios).mount("#app");

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${
    localStorage.getItem("token") || ""
  }`;
  return config;
});

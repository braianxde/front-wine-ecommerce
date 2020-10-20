import Vue from "vue";
import App from "./App.vue";
import router from "@/plugins/router";
import i18n from "@/plugins/i18n";
import store from "@/plugins/store";
import Toasted from 'vue-toasted';
import money from 'v-money'

Vue.use(money, {precision: 2})

Vue.config.productionTip = false;

Vue.use(Toasted, {duration: 5000});

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
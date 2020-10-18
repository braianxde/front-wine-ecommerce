import Vue from "vue";
import App from "./App.vue";
import router from "@/plugins/router";
import i18n from "@/plugins/i18n";
import VueToast from "vue-toast-notification";
import store from "@/plugins/store";


Vue.config.productionTip = false;

Vue.use(VueToast, { position: "top", duration: 5000 });

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
import Vue from "vue";
import iView from "iview";
import App from "./App.vue";
import { router } from "./router/index";
import store from "./store/store";
import "iview/dist/styles/iview.css";

Vue.config.productionTip = false;
Vue.use(iView);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

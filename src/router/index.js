import Vue from "vue";
import Router from "vue-router";
import { routers } from "./router";
import Cookies from "js-cookie";
import Util from "../utils/util";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routers
});

router.beforeEach((to, from, next) => {
  Util.title(to.meta.title);

  if (!Cookies.get("userInfo") && to.name !== "login") {
    // 判断是否已经登录且前往的页面不是登录页
    next({
      name: "login"
    });
  } else if (Cookies.get("userInfo") && to.name === "login") {
    // 判断是否已经登录且前往的是登录页
    Util.title();
    next({
      name: "home"
    });
  } else {
    next();
  }
});

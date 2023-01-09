// #ifndef VUE3
import Vue from "vue";
import App from "./App";
import $http from "@/utils/url.js";
// 导入store实例对象
import store from "./store/store.js";
// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http;
// 封装提示方法
uni.$showMsg = function (title = "数据加载失败", duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: "none",
  });
};

Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App,
  store,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
// #endif

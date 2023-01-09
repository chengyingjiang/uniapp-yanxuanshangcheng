// 1导入vue和vuex
import Vue from "vue";
import Vuex from "vuex";
// 导入购物车的vuex模块
import moduleCart from "./module/cart.js";

// 2将vuex安装为vue的插件
Vue.use(Vuex);
// 3创建store的实例对象
const store = new Vuex.Store({
  modules: {
    m_cart: moduleCart,
  },
});

// 4 向外共享Store的实例对象
export default store;

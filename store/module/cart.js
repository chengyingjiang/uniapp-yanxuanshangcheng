export default {
  // 开启命名空间
  namespaced: true,
  // 模块的state数据
  state: () => ({
    // 用来存储购物车中的每个商品信息对象
    carts: JSON.parse(uni.getStorageSync('carts') || '[]')
  }),
  // 模块的mutations方法
  mutations: {
    addToCart(state, goods) {
      // 根据提交的商品id，查询购物车中是否存在这件商品
      // 如果不存在  则findResult为undefined否则 为查找到的商品信息对象
      const findResult = state.carts.find(x => x.id === goods.id);
      if (!findResult) {
        // 购物车中没有这件商品 则直接push
        state.carts.push(goods);
      } else {
        // 有这件商品，就只更新数量即可
        findResult.num++;
      }
      this.commit('m_cart/saveToStorage')
    },
    // removeCart(state, goods) {
    //   const index = state.carts.indexOf(goods)
    //   state.carts.splice(index, 1)
    //   this.commit('m_cart/saveToStorage')
    // },
    // 将购物车中的数据持久化存储到本地
    saveToStorage(state) {
      uni.setStorageSync('carts', JSON.stringify(state.carts))
    },
    // 更新购物车中商品的勾选状态
    updateGoodsState(state, goods) {
      // 根据id查找购物车中对应的商品信息对象
      const findResult = state.carts.find(x => x.id === goods.id)
      // 有对应的商品信息对象
      if (findResult) {
        // 更新商品状态
        findResult.checked = goods.checked
        // 持久化存储到本地
        this.commit('m_cart/saveToStorage')
      }
    },
    // 更新购物车中商品的数量
    updateGoodsCount(state, goods) {
      // 根据id查找购物车中对应的商品信息对象
      const findResult = state.carts.find(x => x.id === goods.id)
      // 有对应的商品信息对象
      if (findResult) {
        // 更新商品状态
        findResult.num = goods.num
        // 持久化存储到本地
        this.commit('m_cart/saveToStorage')
      }
    },
    // 修改所有商品的选中状态
    updateAllGoodsState(state, newState) {
      // 循环更新购物车中每件商品的勾选状态
      state.carts.forEach(x => x.checked = newState)
      // 通过commit
      this.commit('m_cart/saveToStorage')
    },
  },
  // 模块的getters属性
  getters: {
    // 统计购物车中商品的总数量
    total(state) {
      let c = 0
      // 循环统计商品的数量  累加到变量c中
      state.carts.forEach(goods => c += goods.num)
      return c
    },
    // 统计已勾选商品的总价格
    checkedGoodsAmount(state) {
      // 先使用filter方法 从购物车中过滤已勾选的商品
      // 再使用reduce 进行累加  已勾选商品总数量*单价  
      // 最后调用toFixed(2)  保留2位小数
      return state.carts.filter(x => x.checked)
        .reduce((total, item) => total += item.num * item.price, 0)
        .toFixed(2)
    },
    // 统计已勾选商品的总数量
    checkedCount(state) {
      // 先使用filter方法 从购物车中过滤已勾选的商品
      // 再使用reduce 进行累加   reduce的返回值就是已勾选商品的总数量
      return state.carts.filter(x => x.checked).reduce((total, item) => total += item.num, 0)
    },
  },
};

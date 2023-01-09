<template>
  <view class="my-settle-container">
    <!-- 全选区域 -->
    <label class="radio" @click="changeAllChecked">
      <radio color="#c00000" :checked="isFullChecked" />
      <text>全选</text>
    </label>
    <!-- 合计区域 -->
    <view class="amount-box">
      合计:
      <text class="amount">¥{{ checkedGoodsAmount }}</text>
    </view>
    <!-- 结算按钮 -->
    <view class="btn-settle" @click="addOrder">结算({{ checkedCount }})</view>
  </view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'MySettle',
  data() {
    return {};
  },
  computed: {
    ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
    // 是否全选
    isFullChecked() {
      // total 购物车商品的总数量
      return this.total === this.checkedCount;
    }
  },
  methods: {
    ...mapMutations('m_cart', ['updateAllGoodsState']),
    changeAllChecked() {
      // 修改购物车中所有商品的选中状态
      this.updateAllGoodsState(!this.isFullChecked);
    },
    // onSubmit() {
    //   uni.navigateTo({
    //     url: '/subpkg/order-list/order-list'
    //   });
    // },
    addOrder() {
      // 判断用户是否登录了
      if (!uni.getStorageSync('token')) {
        uni.$showMsg('请先登录');
        return wx.navigateTo({
          url: '/subpkg/login/login'
        });
      }
      wx.navigateTo({
        url: '/subpkg/order-list/order-list'
      });
    }
  }
};
</script>

<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;
  .radio {
    display: flex;
    align-items: center;
  }
  .amount {
    color: #c00000;
  }
  .btn-settle {
    height: 50px;
    min-width: 100px;
    background-color: #f00;
    color: #fff;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
  }
}
</style>

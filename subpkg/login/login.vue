<template>
  <view class="login-container">
    <view class="login-main">
      <form @submit="formSubmit">
        <view class="uni-form-item uni-column">
          <input class="uni-input" name="mobile" placeholder="用户名" />
        </view>
        <view class="uni-form-item uni-column">
          <input class="uni-input" name="pwd" placeholder="密码" />
        </view>
        <view class="uni-btn-v">
          <button form-type="submit" type="warn">登录</button>
        </view>
      </form>
    </view>
  </view>
</template>

<script>
import { objToStr } from '@/utils/auth.js';
export default {
  data() {
    return {};
  },
  methods: {
    // 登录
    async formSubmit(e) {
      // 异步请求
      let { data: res } = await uni.$http.get(
        'small4/user/m/login?deviceId=007&deviceName=monkey&' +
          objToStr(e.detail.value)
      );
      // console.log(res,"login")
      uni.setStorageSync('token', res.data.token);
      uni.switchTab({
        url: '/pages/my/my'
      });
    },
    // 结算
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
.login-container {
  padding: 100px 40px;
  .login-main {
    .uni-form-item input {
      height: 30px;
      margin: 10px 0;
      padding-left: 10px;
      border: 1px solid gray;
      border-radius: 5px;
      font-size: 12px;
    }
  }
}
</style>

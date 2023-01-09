<template>
  <view class="payment">
    <view class="tops" v-for="(item, i) in goods" :key="i">
      <view class="left"><text class="iconfont">&#xe69d;</text></view>
      <view class="right">
        <view class="tit">
          {{ item.name }}商品金额
          <text>{{ item.price }}</text>
        </view>
        <view class="number">订单号:2210022333333</view>
      </view>
    </view>
    <!-- 底部按钮 -->
    <view class="bottom" @click="payFn">微信支付4</view>
  </view>
</template>

<script>
import { login, getOpenid, payment, prepay } from '@/utils/http.js';
export default {
  data() {
    return {
      goods: []
    };
  },
  onLoad() {
    // 获取商品列表数据
    this.getGoods();
  },
  methods: {
    getGoods() {
      //  本地存储中获取到购物车数据
      let cart = JSON.parse(uni.getStorageSync('carts'));
      // 过来购物车数据中选中的商品
      this.goods = cart.filter(item => {
        return item.checked == true;
      });
    },
    async payFn() {
      // 支付功能
      // 1 获取code  微信授权
      const { code } = await login();
      // console.log(res,0)
      // 2 获取openid   发送code到后端  拿到openid
      const result = await getOpenid({ code });
      // console.log(result)
      let openid = result.data.openid;
      // 把openid存储到本地
      uni.setStorageSync('openid', openid);
      // 缓存预支付信息   获取prepayId  调用后端接口生成预支付订单  道道prepayid
      const result1 = await prepay({
        openid,
        body: '测试',
        out_trade_no: new Date().getTime().toString(),
        total_fee: 400
      });
      // 调起微信支付
      await payment({ ...result1.data });
    }
  }
};
</script>

<style lang="scss">
@import '@/static/font/iconfont.css';
.payment {
  padding: 0 10px;
  .tops {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #333;
    .left {
      width: 30px;
    }
    .right {
      flex: 1;
      padding-left: 5px;
      font-size: 12px;
      line-height: 20px;
      .tit {
        text {
          color: red;
        }
      }
      .number {
        color: #ccc;
      }
    }
  }
  .bor {
    border: none;
  }
}
.bottom {
  position: fixed;
  bottom: 0;
  width: 95%;
  height: 40px;
  line-height: 40px;
  background-color: #f00;
  color: #fff;
  text-align: center;
}
</style>

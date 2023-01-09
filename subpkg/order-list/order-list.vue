<template>
  <view class="order-list">
    <view class="address-list">
      <view class="address-list-top">
        <span class="iconfont">&#xebbb;</span>
        <view class="title">
          <text class="tit">{{ address.userName }}{{ address.telNumber }}</text>
          <text class="iconfont jt">&#xe65f;</text>
        </view>
      </view>
      <view class="address-list-bot">
        {{ address.provinceName }}{{ address.cityName }}{{ address.countyName
        }}{{ address.detailInfo }}
      </view>
    </view>
    <!-- 商品列表 -->
    <view class="goods">
      <view class="title">商品列表</view>
      <view class="list" v-for="(item, i) in goods" :key="i">
        <image :src="item.pic" mode=""></image>
        <view class="content">
          <view class="tit">{{ item.name }}</view>
          <view class="size">{{ item.price }}</view>
        </view>
      </view>
    </view>
    <!-- 配送方式 -->
    <view class="distribution">
      <text class="left">配送方式</text>
      <text class="courier">快递</text>
    </view>
    <!-- 备注 -->
    <view class="remark">
      <text>备注</text>
      <input type="text" placeholder="如需备注请输入" />
    </view>
    <!-- 商品金额 -->
    <view class="pricelist">
      <text class="tit">商品金额</text>
      <text class="price">4</text>
    </view>
    <!-- 商品导航 -->
    <view class="my-settle-container">
      <!-- 合计区域 -->
      <view class="amount-box">
        合计:
        <text class="amount">¥4.00</text>
      </view>
      <!-- 结算按钮 -->
      <view class="btn-settle" @click="onSubmit">提交订单</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      address: {},
      goods: []
    };
  },
  async onLoad() {
    let [err, suc] = await uni.chooseAddress();
    this.address = suc;
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
    onSubmit() {
      uni.navigateTo({
        url: '/subpkg/payment/payment'
      });
    }
  }
};
</script>

<style lang="scss">
@import '@/static/font/iconfont.css';
.order-list {
  padding: 10px;
  .address-list {
    .address-list-top {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .title {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .jt {
          font-size: 12px;
        }
      }
    }
    .address-list-bot {
      padding-left: 15px;
      font-size: 12px;
    }
  }
  // 商品列表
  .goods {
    margin-top: 10px;
    .title {
      border-bottom: 1px solid #ccc;
      line-height: 30px;
      font-size: 12px;
    }
    .list {
      display: flex;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      image {
        width: 100px;
        height: 100px;
      }
      .content {
        margin-left: 10px;
        .tit {
          margin-top: 15px;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .size {
          font-size: 14px;
          color: #ccc;
        }
      }
    }
  }
  // 配送
  .distribution {
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    font-size: 14px;
    .left {
    }
    .courier {
      color: #ccc;
    }
  }
  // 备注
  .remark {
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
  }
  // jine
  .pricelist {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
  // 商品导航
  .my-settle-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;
    .amount {
      color: #c00000;
    }
    .btn-settle {
      margin-left: 10px;
      height: 40px;
      min-width: 100px;
      background-color: #f00;
      color: #fff;
      line-height: 40px;
      text-align: center;
      padding: 0 10px;
      border-radius: 20px;
    }
  }
}
</style>

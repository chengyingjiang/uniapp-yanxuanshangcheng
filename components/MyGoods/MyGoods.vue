<template>
  <view>
    <!-- 商品左侧图片区域 -->
    <view class="goods-item-left">
      <radio
        :checked="goods.checked"
        color="#f00"
        v-if="showRadio"
        @click="radioClickHandler"
      ></radio>
      <image :src="goods.pic" class="goods-pic"></image>
    </view>
    <view class="goods-item-right">
      <view class="goods-name">{{ goods.name }}</view>
      <view class="goods-info-box">
        <!-- 商品价格 -->
        <view class="goods-price">¥{{ goods.price }}</view>
        <!-- 商品数量 -->
        <uni-number-box
          :value="goods.num"
          v-if="showNum"
          @change="numChangeHandler"
        />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'MyGoods',
  // 定义props属性
  props: {
    // 商品的信息对象
    goods: {
      type: Object,
      default: {}
    },
    // 是否显示左侧的radio
    showRadio: {
      type: Boolean,
      default: false
    },
    showNum: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    // radio组件点击事件处理函数
    radioClickHandler() {
      // 通过this.$emit 触发外界通过@绑定的radio-change事件
      // 把商品的id和勾选状态作为参数传递给radio-change事件处理函数
      this.$emit('radio-change', {
        id: this.goods.id,
        // 商品最新的勾选状态
        checked: !this.goods.checked
      });
    },
    numChangeHandler(val) {
      this.$emit('num-change', {
        id: this.goods.id,
        num: +val
      });
    }
  }
};
</script>

<style lang="scss">
.goods-item-left {
  margin-right: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .goods-pic {
    width: 100px;
    height: 100px;
    display: block;
  }
}
.goods-item-right {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  .goods-name {
    font-size: 14px;
  }
  .goods-info-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .goods-price {
      font-size: 16px;
      color: #f00;
    }
  }
}
</style>

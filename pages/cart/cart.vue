<template>
  <view class="cart-container" v-if="carts.length !== 0">
    <!-- 标题区域 -->
    <view class="cart-title">
      <!-- 左侧图标 -->
      <icon type="success" size="18" />
      <text class="cart-title-text">购物车</text>
    </view>
    <uni-swipe-action>
      <!-- 购物车列表 -->
      <block v-for="(goods, i) in carts" :key="i">
        <uni-swipe-action-item :right-options="options" @click="onClick">
          <my-goods
            :goods="goods"
            :show-radio="true"
            :show-num="true"
            @radio-change="radioChangeHandler"
            @num-change="numberChangeHandler"
          ></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <uni-popup ref="baseDialog" type="dialog">
      <uni-popup-dialog
        ref="baseClose"
        mode="base"
        title="提示"
        content="确定删除该商品吗？"
        @close="close"
        @confirm="close"
      ></uni-popup-dialog>
    </uni-popup>
    <!-- 结算组件 -->
    <my-settle></my-settle>
  </view>
  <view class="empty-cart" v-else>
    <image src="../../static/empty.png" class="empty-img"></image>
    <text class="tip-text">空空如也</text>
  </view>
</template>

<script>
import badgeMix from '@/mixins/tabar-badge.js';
import MyGoods from '@/components/MyGoods/MyGoods.vue';
import MySettle from '@/components/MySettle/MySettle.vue';
import { mapState, mapMutations } from 'vuex';
export default {
  mixins: [badgeMix],
  components: {
    MyGoods,
    MySettle
  },
  data() {
    return {
      options: [
        {
          text: '删除',
          style: {
            backgroundColor: '#f00'
          }
        }
      ]
    };
  },
  computed: {
    ...mapState('m_cart', ['carts'])
  },
  methods: {
    ...mapMutations('m_cart', [
      'updateGoodsState',
      'updateGoodsCount'
      // 'removeCart'
    ]),
    // 商品勾选状态发生变化
    radioChangeHandler(e) {
      this.updateGoodsState(e);
    },
    // 商品数量发生变化
    numberChangeHandler(e) {
      this.updateGoodsCount(e);
    },
    onClick() {
      this.$refs.baseDialog.open();
    },
    close() {
      this.$refs.baseDialog.close();
    }
    // confirm(goods) {
    //   this.removeCart(goods);
    // }
  }
};
</script>

<style lang="scss">
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #eee;
  .cart-title-text {
    margin-left: 10px;
  }
}
.dialog,
.share {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
}
.dialog-box {
  padding: 10px;
}
.dialog .button,
.share .button {
  /* #ifndef APP-NVUE */
  width: 100%;
  /* #endif */
  margin: 0;
  margin-top: 10px;
  padding: 3px 0;
  flex: 1;
}
.dialog-text {
  font-size: 14px;
  color: #333;
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  .empty-img {
    width: 90px;
    height: 90px;
  }
  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>

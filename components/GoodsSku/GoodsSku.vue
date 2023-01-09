<template>
  <view class="popup-view">
    <view class="basic">
      <image :src="basicInfo.pic" mode=""></image>
      <view class="basic-tit">
        <view class="tit">{{ basicInfo.name }}</view>
        <view class="price">{{ basicInfo.minPrice }}</view>
      </view>
    </view>
    <!-- 规格尺寸 -->
    <view class="goods-properties-wrapper">
      <view class="goods-item" v-for="(item, i) in properties" :key="item.id">
        <view class="goods-properties-title">{{ item.name }}</view>
        <view class="goods-properties-btn-wrapper">
          <view
            :class="['goods-properties-btn', curIndex === i2 ? 'active' : '']"
            @click="chooseGoodsProps(item, i, i2)"
            v-for="(item2, i2) in item.childsCurGoods"
            :key="i2"
          >
            {{ item2.name }}
          </view>
        </view>
      </view>
    </view>
    <view class="number">
      <uni-number-box v-model="skuData.num"></uni-number-box>
    </view>
    <view class="add-btn" @click="addClick">加入购物车</view>
  </view>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'GoodsSku',
  props: {
    basicInfo: {
      type: Object,
      default: {}
    },
    properties: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      curIndex: '',
      chooseProps: [], //当前选中的规格属性名
      choosePropsIds: [], //当前选中的规格属性id
      // 选中属性的数据
      skuData: {
        id: '',
        pic: '',
        name: '',
        price: '',
        num: 1,
        props: '',
        ids: '', //id选择的商品属性
        checked: false
      }
    };
  },
  methods: {
    // ...mapMutations('m_cart',['addToCart'])
    ...mapMutations(['m_cart/addToCart']),
    // 判断是否有属性
    addClick() {
      this.skuData.id = this.basicInfo.id;
      this.skuData.pic = this.basicInfo.pic;
      this.skuData.name = this.basicInfo.name;
      this.skuData.price = this.basicInfo.minPrice;
      // 判断是否有属性
      if (this.properties && this.properties.length > 0) {
        // 有属性  判断是否选择了商品属性
        if (
          this.chooseProps[0] &&
          this.chooseProps.length == this.properties.length
        ) {
          this['m_cart/addToCart'](this.skuData);
        } else {
          return uni.showToast({
            title: '请选择商品属性',
            duration: 1500,
            icon: 'none'
          });
        }
      } else {
        this['m_cart/addToCart'](this.skuData);
      }
      // 关闭弹框
      this.$emit('closeEvent');
      uni.showToast({
        title: '加入购物车成功',
        duration: 1500,
        icon: 'success'
      });
    },
    // 点击规格属性
    chooseGoodsProps(item, index, idx) {
      // ---目的是让当前点击的规格属性进行选中
      this.curIndex = idx;
      // 将当前选中的属性保存到数组中
      this.chooseProps[index] = item.childsCurGoods[idx].name;
      // 将选择的商品的propertyId和id保存到数组中  形式  propertyId:id
      this.choosePropsIds[index] =
        item.childsCurGoods[idx].propertyId + ':' + item.childsCurGoods[idx].id;
      // 将选中的商品id分隔后保存到skuData中
      this.skuData.ids = this.choosePropsIds.join(',');
    }
  }
};
</script>

<style lang="scss">
.popup-view {
  background-color: #fff;
  padding: 10px;
  .basic {
    display: flex;
    justify-content: flex-start;
    image {
      width: 100px;
      height: 100px;
    }
    .basic-tit {
      margin-left: 5px;
      .tit {
        font-size: 14px;
      }
      .price {
        color: #f00;
      }
    }
  }
  // 规格尺寸
  .goods-properties-wrapper {
    margin-top: 10px;
    border-bottom: 1px solid #f5f5f5;
    box-sizing: border-box;
    font-size: 14px;
    .goods-item {
      font-size: 13px;
      .goods-properties-title {
        margin-bottom: 10px;
        margin-left: 10px;
      }
      .goods-properties-btn-wrapper {
        display: flex;
        flex-wrap: wrap;
        .goods-properties-btn {
          margin-right: 8px;
          margin-bottom: 20px;
          padding: 8px 15px;
          border-radius: 5px;
          border: 1px solid #d9d9d9;
          &.active {
            border-color: #f00;
          }
        }
      }
    }
  }
  .add-btn {
    margin-top: 10px;
    background-color: #f00;
    line-height: 44px;
    text-align: center;
    color: #fff;
  }
}
</style>

<template>
  <view>
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="1500" :duration="1000">
      <swiper-item v-for="(item, i) in goods_info.pics" :key="i">
        <image :src="item.pic" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    <uni-card
      :title="goods_info.basicInfo.name"
      :isFull="true"
      :sub-title="goods_info.basicInfo.minPrice"
      :extra="'库存' + goods_info.basicInfo.stores"
    ></uni-card>
    <!-- 详情 -->
    <view class="content"><rich-text :nodes="goods_info.content"></rich-text></view>
    <!-- 商品导航区域 -->
    <view class="goods-nav">
      <!-- 
			 options 左侧按钮的配置项
			 buttonGroup  右侧按钮的配置项
			 click 左侧按钮的点击事件处理函数
			 buttonClick 右侧按钮的点击事件处理函数
			 -->
      <uni-goods-nav :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
    </view>
    <!-- 商品sku部分 -->
    <uni-popup ref="popup" class="mypopup" type="bottom">
      <GoodsSku :basicInfo="goods_info.basicInfo" :properties="goods_info.properties" @closeEvent="closeFn"></GoodsSku>
    </uni-popup>
  </view>
</template>

<script>
import GoodsSku from '@/components/GoodsSku/GoodsSku.vue';
import { mapGetters } from 'vuex';
export default {
  components: { GoodsSku },
  data() {
    return {
      // 商品详情对象
      goods_info: {},
      goods_id: '', //商品详情id
      options: [
        {
          icon: 'headphones',
          text: '客服'
        },
        {
          icon: 'shop',
          text: '店铺',
          infoBackgroundColor: '#007aff',
          infoColor: 'red'
        },
        {
          icon: 'cart',
          text: '购物车'
        }
      ],
      buttonGroup: [
        {
          text: '加入购物车',
          backgroundColor: '#ff0000',
          color: '#fff'
        },
        {
          text: '立即购买',
          backgroundColor: '#ffa200',
          color: '#fff'
        }
      ]
    };
  },
  onLoad(options) {
    // 获取商品id
    this.goods_id = options.id;
    // 调用请求商品详情数据的方法
    this.getGoodsDetail();
  },
  methods: {
    async getGoodsDetail() {
      let { data: res } = await uni.$http.get('small4/shop/goods/detail?id=' + this.goods_id);
      this.goods_info = res.data;
    },
    // 轮播图的预览效果
    preview(i) {
      // 调用uni.previewImage方法预览图片
      uni.previewImage({
        // 预览时，默认显示图片的索引
        current: i,
        // 所有图片url地址的数据['图片地址'，'图片地址']
        urls: this.goods_info.pics.map(x => x.pic)
      });
    },
    onClick(e) {},
    buttonClick(e) {
      if (e.index === 0) {
        this.$refs.popup.open();
      }
    },
    closeFn() {
      this.$refs.popup.close();
    }
  },
  watch: {
    total: {
      // handler定义侦听器的function处理函数
      handler(newVal) {
        // 通过数组的find方法，找到购物车按钮的配置对象
        const findResult = this.options.find(x => x.text === '购物车');
        if (findResult) {
          findResult.info = newVal;
        }
      },
      // 是否在页面初次加载完后立即执行
      immediate: true
    }
  },
  computed: {
    ...mapGetters('m_cart', ['total'])
  }
};
</script>

<style lang="scss">
swiper {
  height: 750rpx;
  image {
    width: 100%;
    height: 100%;
  }
}

.content {
  width: 100%;
  .img-lazyload {
    width: 100% !important;
    height: 200rpx !important;
  }
}

.goods-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

// 弹出层
.mypopup {
  width: 100%;
  height: 100%;
}
</style>

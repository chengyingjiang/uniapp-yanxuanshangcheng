<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="2000" :circular="true">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <view class="swiper-item"><image :src="item.picUrl"></image></view>
      </swiper-item>
    </swiper>
    <view class="concentration-title">
      <view class="header-title">
        <text>精选专题</text>
        >
      </view>
      <view class="list-wrapper">
        <ul class="list">
          <li v-for="(item, i) in newsList" :key="i">
            <image :src="item.pic" />
            <view class="title ellipsis">{{ item.title }}</view>
            <view class="description ellipsis">{{ item.descript }}</view>
          </li>
        </ul>
      </view>
    </view>
    <!-- 人气推荐 -->
    <div class="tuijian">
      <div class="header-title">
        <span>人气推荐</span>
        <van-icon name="arrow"></van-icon>
      </div>
      <!-- 人气推荐列表 -->
      <list :goods="commendList"></list>
    </div>
  </view>
</template>

<script>
import list from '@/components/list/list.vue';
import badgeMix from '@/mixins/tabar-badge.js';
export default {
  mixins: [badgeMix],
  components: {
    list
  },
  data() {
    return {
      // 1  轮播图数据列表，默认是空数组
      swiperList: [],
      // 精选专栏
      newsList: [],
      // 人气推荐
      commendList: []
    };
  },
  async onLoad() {
    // 2.在小程序页面刚加载的时候，调用获取轮播图数据的方法
    this.getSwiperList();
    this.getNewsList();
    this.getCommendList();
  },
  methods: {
    // 3 获取轮播图数据的方法
    async getSwiperList() {
      // 发起请求
      const { data: res } = await uni.$http.get('small4/banner/list');
      // 请求失败
      if (res.code !== 0) return uni.$showMsg();
      // 请求成功  给data中的数据赋值
      this.swiperList = res.data;
    },
    async getNewsList() {
      const { data: res } = await uni.$http.get('small4/cms/news/list');
      if (res.code !== 0) return uni.$showMsg();
      this.newsList = res.data;
    },
    async getCommendList() {
      const { data: res } = await uni.$http.get('small4/shop/goods/list');
      if (res.code !== 0) return uni.$showMsg();
      this.commendList = res.data;
    }
  }
};
</script>

<style lang="scss">
swiper {
  height: 720rpx;

  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}

// 精选专题
.concentration-title {
  .header-title {
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;

    span:first-child {
      margin-right: 15px;
    }

    .van-icon {
      margin-top: 2px;
    }
  }

  .list-wrapper {
    overflow-x: scroll;

    // 单行隐藏
    .ellipsis {
      overflow: hidden;
      /*超出的部分隐藏*/
      text-overflow: ellipsis;
      /*超出的部分显示省略号*/
      white-space: nowrap;
      /*只显示一行加上省略号*/
    }

    .list {
      display: flex;

      li {
        padding-bottom: 16px;
        margin-left: 6px;
        box-sizing: border-box;

        img {
          width: 300px;
          height: 192px;
          border-radius: 5px;
        }

        .title {
          width: 200px;
          font-size: 18px;
          color: #2c2c2c;
        }

        .description {
          margin-top: 10px;
          width: 162px;
          font-size: 14px;
          color: #a8a8a8;
        }
      }
    }
  }
}

// 人气推荐
.tuijian {
  .header-title {
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;

    span:first-child {
      margin-right: 15px;
    }

    .van-icon {
      margin-top: 2px;
    }
  }
}
</style>

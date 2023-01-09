<template>
  <view class="scroll-view-container">
    <!-- 左侧 -->
    <scroll-view class="left-scroll-view" scroll-y :style="{ height: wh + 'px' }">
      <view
        :class="['left-scroll-view-item', i === active ? 'active' : '']"
        v-for="(item, i) in cateList"
        :key="item.id"
        @click="activeChanged(i)"
      >
        {{ item.name }}
      </view>
    </scroll-view>
    <!-- 右侧 -->
    <scroll-view class="right-scroll-view" scroll-y :style="{ height: wh + 'px' }">
      <view class="scroll-view">
        <view @click="gotoGoodsList(item)" class="cate-lv2-item" v-for="item in cateLevel2" :key="item.id">
          <image :src="item.icon"></image>
          <text>{{ item.name }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { tranListToTreeData } from '../../utils/auth';
import badgeMix from '@/mixins/tabar-badge.js';
export default {
  mixins: [badgeMix],
  data() {
    return {
      // 窗口的可用高度=屏幕高度-navigationBar高度-tabBar高度
      wh: 0,
      cateList: [],
      // 当前选中项的索引 默认让第一项被选中
      active: 0,
      // 二级分类列表
      cateLevel2: []
    };
  },
  onLoad() {
    // 获取当前系统信息
    const sysInfo = uni.getSystemInfoSync();
    // 为wh窗口可用高度赋值
    this.wh = sysInfo.windowHeight;
    this.getCateList();
  },
  methods: {
    async getCateList() {
      let { data: res } = await uni.$http.get('small4/shop/goods/category/all');
      if (res.code !== 0) return uni.$showMsg();
      this.cateList = tranListToTreeData(res.data, 0);
      // 为二级分类赋初始值
      this.cateLevel2 = res.data[0].children;
    },
    activeChanged(i) {
      // 选中项改变的事件处理函数
      this.active = i;
      // 为二级分类重新赋值
      this.cateLevel2 = this.cateList[i].children;
    },
    // 点击二级分类跳转到商品列表页面
    gotoGoodsList(item) {
      uni.navigateTo({
        url: '/subpkg/goods_list/goods_list?cid=' + item.id
      });
    }
  }
};
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;
  .left-scroll-view {
    width: 120px;
    .left-scroll-view-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;
      &.active {
        background-color: #fff;
        position: relative;
        &::before {
          content: '';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #f00;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  // 右侧
  .right-scroll-view {
    padding-top: 10px;
    .scroll-view {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .cate-lv2-item {
        width: 40%;
        text-align: center;
        image {
          width: 100px;
          height: 100px;
        }
      }
    }
  }
}
</style>

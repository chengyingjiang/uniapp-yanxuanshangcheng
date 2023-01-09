<template>
  <view class="list">
    <view
      class="list-item"
      v-for="item in goods"
      :key="item.id"
      @click="gotoDetail(item)"
    >
      <image :src="item.pic"></image>
      <view class="title">{{ item.name }}</view>
      <view class="price">￥{{ item.minPrice }}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: "list",
  props: {
    goods: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {};
  },
  methods: {
    gotoDetail(item) {
      uni.navigateTo({
        url: "/subpkg/goods_detail/goods_detail?id=" + item.id,
      });
    },
  },
};
</script>

<style lang="scss">
.list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 10px;
  .list-item {
    width: 48%;
    margin-top: 10px;
    image {
      width: 100%;
    }
    .price {
      font-size: 12px;
      color: #f00;
    }
  }
}
</style>

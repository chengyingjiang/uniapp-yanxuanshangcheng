<template>
  <view>
    <view v-if="goodsList.length <= 0">暂无数据</view>
    <list :goods="goodsList" v-else></list>
  </view>
</template>

<script>
import list from "@/components/list/list.vue";
export default {
  components: { list },
  data() {
    return {
      cid: "",
      // 商品列表数据
      goodsList: [],
    };
  },
  onLoad(options) {
    // 获取页面的参数
    this.cid = options.cid;
    // 调用获取商品列表数据的方法
    this.getGoodsList();
  },
  methods: {
    async getGoodsList() {
      let { data: res } = await uni.$http.get("small4/shop/goods/list");
      this.goodsList = res.data.filter((item) => {
        return item.categoryId == this.cid;
      });
    },
  },
};
</script>

<style lang="scss"></style>

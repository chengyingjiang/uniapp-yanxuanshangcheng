import {
  mapGetters
} from 'vuex'

export default {
  computed: {
    ...mapGetters('m_cart', ['total'])
  },
  onShow() {
    // 在页面刚展示的时候，设置数字徽标
    this.setBadge()
  },
  watch: {
    // 监听total的变化
    total() {
      // 重新给tabbar进行赋值
      this.setBadge()
    }
  },
  methods: {
    setBadge() {
      // 动态设置 tabBar 某一项的内容
      uni.setTabBarBadge({
        index: 2,
        text: this.total + "" //text的值必须是字符串  不能是数字
      })
    }
  }
}

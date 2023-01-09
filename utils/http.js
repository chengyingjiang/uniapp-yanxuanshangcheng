// const baseUrl="http://likuan123.top/"
const baseUrl = "http://api.aoaoxiong.top/"

function http(url, method, data, header) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url,
      header,
      method,
      data,
      success: function(res) {
        resolve(res)
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
}
// 登录----
// code  	用户登录凭证。开发者需要在开发者服务器后台，使用 code 换取 openid 和 session_key 等信息
const login = () => {
  return new Promise((resolve, reject) => {
    // 微信内置登录  微信登录
    uni.login({
      success: function(res) {
        resolve(res)
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
}
// 获取openid   在开发者服务器后台，使用 code 换取 openid
const getOpenid = data => http('openid.php', 'GET', {
  ...data
})
// 获取微信预支付信息
const prepay = data => http('jsapi.php', 'POST', {
  ...data
})
// 获取微信支付
const payment = data => {
  return new Promise((resolve, reject) => {
    // uni.requestPayment是一个统一各平台的客户端支付API
    uni.requestPayment({
      ...data,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
export {
  login,
  getOpenid,
  payment,
  prepay
}

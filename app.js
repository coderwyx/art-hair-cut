// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });

    //获取用户信息
    // wx.getUserProfile({
    //   desc: '用于完善用户资料',
    //   success:(res)=>{
    //     console.log("获取用户信息成功", res)
    //   },
    //   fail: (err) => {
    //     console.log(err);
    //   }
    // })
    console.log("111")
  },
  globalData: {
    userInfo: null
  }
})

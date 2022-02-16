// app.js

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


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
  },
  globalData: {
    userInfo: null,
    baseURL: 'http://35807s79k5.qicp.vip',
    appid: 'wx30979db1068ab70f',
    userid: "",
    shoppingCartList: []
  }
})
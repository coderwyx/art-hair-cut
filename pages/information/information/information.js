// pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    defaultImgSrc: '/img/defaultImg.png',
    moneyData: {
      money: 3.12,
      coupons: 0,
      integral: 251
    },
    orderStatus: [{
      icon: 'icon-daifukuan',
      state: '待付款',
    }, {
      icon: 'icon-xiaofei',
      state: '待消费'
    }, {
      icon: 'icon-31daifahuo',
      state: '待发货'
    }, {
      icon: 'icon-31daishouhuo',
      state: '待收货'
    }, {
      icon: 'icon-daipingjia',
      state: '待评价'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const user = wx.getStorageSync('user')

    if (user) {
      this.setData({
        userInfo: user
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  login() {

    const userInfo = wx.getStorageSync('user')

    if (!userInfo) {
      wx.getUserProfile({
        desc: "用于完善用户资料",

        success: res => {
          console.log("获取用户信息成功", res)
          const user = res.userInfo;
          wx.setStorageSync('user', user)
          this.setData({
            userInfo: user
          })
        },
        fail: err => {
          console.log(err)
        }
      })
    } else {
      this.setData({
        userInfo: userInfo
      })
    }


  },

  checkOrder() {
    wx.navigateTo({
      url: '/pages/information/order/order',
    })
  }
})
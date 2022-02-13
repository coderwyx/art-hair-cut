// pages/information/information.js
import HTTP from '../../../utils/requestFn/api'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    defaultImgSrc: '/img/defaultImg.png',
    moneyData: {
      money: 0.00,
      coupons: 0,
      integral: 50
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
          // 登录
          wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              console.log(res)
              if (res.code) {
                wx.request({
                  url: 'http://35807s79k5.qicp.vip/wx/user/wx30979db1068ab70f/login',
                  data: {
                    code: res.code
                  },
                  success(res) {
                    const openid = res.data.openid
                    console.log("获取用户openid成功", openid)
                    wx.setStorageSync('openid', openid)
                    if (res.data.auth === 'yes') {
                      wx.setStorageSync('userid', res.data.id)
                      app.globalData.userid = res.data.id || ''
                      console.log("获取到userid", app.globalData.userid)
                    } else if (res.data.auth === 'no') {

                      HTTP.loginApi({
                        nickName: user.nickName,
                        openid: openid
                      }).then(res => {
                        wx.setStorageSync('userid', res.data.id)
                        app.globalData.userid = res.data.id || '',
                          console.log("获取到userid", app.globalData.userid)

                      }).catch(err => {
                        console.log(err)
                      })
                    }
                  },
                  fail(err) {
                    console.error("获取用户openid失败", err)
                  }
                })
              } else {
                console.error("登录失败" + res.errMsg)
              }
            }
          });

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
  },

  goInfo() {
    wx.navigateTo({
      url: '../userInfo/userInfo',
    })
  },
  toShoppingCart() {
    wx.navigateTo({
      url: '../shoppingCart/shoppingCart',
    })
  },
  appointment() {
      wx.navigateTo({
        url: '../appointment/appointment',
      })
  }
})
// pages/discovery/discovery.js
import HTTP from '../../../utils/requestFn/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    productList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductList()
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
  toDiscoverInfo(e) {
    console.log(e)
    const id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../discoveryInfo/discoveryInfo?id=' + id,
    })
  },
  getProductList() {
    HTTP.getProductList().then(res => {
      const productList = res.data
      this.setData({
        productList: productList
      })
    }).catch(err => {
      console.log(err)

    })
  },
  onSearch() {
    const name = this.data.value
    console.log(name)
    HTTP.seachProduct({
      name: name
    }).then(res => {
      console.log("搜索产品成功", res)
      this.setData({
        productList: res.data
      })
    }).catch(err => {
      console.log(err)
    })
  }
})
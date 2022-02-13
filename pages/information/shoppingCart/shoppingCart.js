const HTTP = require("../../../utils/requestFn/api");

// pages/information/shoppingCart/shoppingCart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shoppingCartList: [],
        total: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        const app = getApp()
        const shoppingCartList = app.globalData.shoppingCartList;
        this.setData({
            shoppingCartList: shoppingCartList
        })
        this.calculateTotal()

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
    onCheckboxChange(e) {

        const index = e.currentTarget.dataset.index;
        this.data.shoppingCartList[index].isCheck = !this.data.shoppingCartList[index].isCheck
        this.setData({
            shoppingCartList: this.data.shoppingCartList
        })
        this.calculateTotal()
    },
    onStepperChange(event) {
        console.log(event)


        const index = event.currentTarget.dataset.index;

        if (event.detail === 0) {
            wx.showModal({
                title: '确定要删除该商品吗？',
                success: () => {
                    this.data.shoppingCartList.splice(index, 1);
                    this.setData({
                        shoppingCartList: this.data.shoppingCartList
                    })
                },
                fail() {
                    return
                }
            })
        }

        this.data.shoppingCartList[index].count = event.detail
        this.setData({
            shoppingCartList: this.data.shoppingCartList
        })
        this.calculateTotal()
    },
    calculateTotal() {
        const total = this.data.shoppingCartList.filter(item => {
            return item.isCheck;
        }).reduce((preValue, item) => {
            return preValue + item.price * item.count;
        }, 0).toFixed(2) * 100;
        this.setData({
            total: total
        })
    },
    onSubmit() {
        const productIds = this.data.shoppingCartList.filter(item => {
            return item.isCheck;
        }).map(item => {
            return item.id
        }).join(",")
        const count = this.data.shoppingCartList.filter(item => {
            return item.isCheck;
        }).map(item => {
            return item.count
        }).join(",")
        const useid = wx.getStorageSync('userid')
        console.log(productIds);
        HTTP.addProductOrder({
            userId: useid,
            productIds: productIds,
            count: count
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
})
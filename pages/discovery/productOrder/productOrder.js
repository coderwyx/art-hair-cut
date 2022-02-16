// pages/discovery/productOrder/productOrder.js
import HTTP from '../../../utils/requestFn/api'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderInfo: {

        },
        count: 0,
        total: 0,
        show: false,
        orderId: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        const orderInfo = JSON.parse(options.productInfo);
        const total = orderInfo.price * options.count * 100
        this.setData({
            orderInfo: orderInfo,
            count: options.count,
            total: total
        });


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
    onSubmit() {
        const userid = wx.getStorageSync('userid')
        console.log(this.data.orderInfo)
        HTTP.addProductOrder({
            userId: userid,
            productIds: this.data.orderInfo.id,
            count: this.data.count
        }).then(res => {
            console.log(res)
            this.setData({
                show: true,
                orderId: res.id
            })
        }).catch(err => {
            console.log(err)
        })
    },
    pay() {
        HTTP.pay(this.data.orderId).then(res => {
            console.log(res)
            wx.showToast({
                title: res
            })
            setTimeout(function () {
                wx.navigateBack({
                    delta: 1,
                })
            }, 1500)

        }).catch(err => {
            console.log(err)
        })
    }
})
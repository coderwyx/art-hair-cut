// pages/information/order/ordeer.js
import HTTP from '../../../utils/requestFn/api'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        orderList: [],
        notPayingOrderList: [],
        finishOrderList: [],
        show: false,
        orderId: '',
        needPay: ''
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
        this.getOrderList()
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
    cancerOrder(event) {
        wx.showModal({
            title: '确定要取消该订单吗?',
            success: (res) => {
                if (res.confirm) {
                    const orderId = event.currentTarget.dataset.orderid;
                    HTTP.cancelOrder(orderId).then(res => {
                        wx.showToast({
                            title: res,
                        })
                        this.getOrderList();

                    }).catch(err => {
                        wx.showToast({
                            title: err,
                        })
                    })
                } else {
                    return
                }

            },
            fail: () => {
                return
            }
        })

    },
    getOrderList() {
        const userid = wx.getStorageSync('userid')
        HTTP.getOrderList(userid).then(res => {
            console.log("获取订单列表成功", res);

            let notPayingOrderList = [];
            let finishOrderList = [];
            notPayingOrderList = res.data.filter(item => {
                return item.status === "0"
            });
            finishOrderList = res.data.filter(item => {
                return item.status === "1"
            });
            this.setData({
                orderList: res.data,
                notPayingOrderList: notPayingOrderList,
                finishOrderList: finishOrderList
            })
        }).catch(err => {
            console.log(err)
        })
    },
    show(e) {
        console.log(e)
        const orderId = e.currentTarget.dataset.orderid;
        const needPay = e.currentTarget.dataset.needpay;
        this.setData({
            show: true,
            needPay: needPay,
            orderId: orderId
        })

    },
    pay() {
        HTTP.pay(this.data.orderId).then(res => {
            wx.showToast({
                title: res
            })
            this.getOrderList()
            setTimeout(() => {
                this.setData({
                    show: false,
                })
            }, 1500)

        }).catch(err => {
            console.log(err)
        })
    }


})
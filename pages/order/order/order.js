// pages/order/order/order.js
import HTTP from '../../../utils/requestFn/api'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        barberList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getBarberList()
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

    makePhone() {
        wx.makePhoneCall({
            phoneNumber: '1234567890', //仅为示例，并非真实的电话号码
            success() {
                console.log('接口调用成功的回调函数')
            },
            fail() {
                console.log('接口调用失败的回调函数')
            },
            complete() {
                console.log('接口调用结束的回调函数（调用成功、失败都会执行）')
            }
        })

    },

    toBarberInfo(e) {
        const id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../barberInfo/barberInfo?id=' + id,
        })
    },
    appointment(e) {

        const id = e.currentTarget.dataset.id
        const userid = wx.getStorageSync('userid')
        if (!userid) {
            return wx.showToast({
                title: '请先登录',
                icon: 'error'
            })
        }
        HTTP.appointmentBarber({
            userId: userid,
            hairdresserId: id
        }).then(res => {
            wx.showToast({
                icon: 'none',
                title: res,
            })
            this.getBarberList()
        }).catch(err => {
            wx.showToast({
                title: err,
            })
            this.getBarberList()
        })
    },
    getBarberList() {
        HTTP.getBarberList().then(res => {
            console.log(res)
            const barberList = res.data;
            this.setData({
                barberList: barberList
            })
        }).catch(err => {
            console.log("获取理发师列表失败", err)
        })
    }
})
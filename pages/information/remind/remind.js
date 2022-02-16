// pages/information/remind/remind.js
import HTTP from '../../../utils/requestFn/api'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        remindList: [],
        show: false,
        minDate: new Date().getTime(),
        maxDate: new Date(2022, 10, 1).getTime(),
        currentDate: new Date().getTime(),
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
        this.getRemind()
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
    getRemind() {
        const userid = wx.getStorageSync('userid')
        HTTP.getRemind(userid).then(res => {
            console.log(res)
            this.setData({
                remindList: res
            })
        }).catch(err => {
            console.log(err)
        })
    },
    delRemind(e) {
        console.log(e)
        const remindId = e.currentTarget.dataset.remindid
        HTTP.delRemind(remindId).then(res => {
            console.log(res);
            wx.showToast({
                title: res,
            })
            this.getRemind();
        }).catch(err => {
            wx.showToast({
                title: err,
            })
        })
    },
    show() {
        const phone = wx.getStorageSync('phone')
        if (phone) {
            this.setData({
                show: true
            })
        } else {
            wx.showToast({
                icon: 'none',
                title: '请先设置手机号',
            })
        }

    },
    onInput(event) {
        this.setData({
            currentDate: event.detail,
        });
    },
    confirm() {
        console.log(this.data.currentDate);
        const userid = wx.getStorageSync('userid')
        HTTP.setRemind(userid, {
            sendTime: this.data.currentDate
        }).then(res => {
            console.log(res);
            wx.showToast({
                title: res,
            })
            this.getRemind()
        }).catch(err => {
            console.log(err)
        })
        this.setData({
            show: false
        })
    },
    cancel() {
        this.setData({
            show: false
        })
    }
})
// pages/order/barberInfo/barberInfo.js
import HTTP from '../../../utils/requestFn/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        barberInfo: {

        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        HTTP.getBaeberInfo(
            options.id
        ).then(res => {
            console.log("获取理发师信息成功", res)
            this.setData({
                barberInfo: res
            })
        }).catch(err => {
            console.log("获取理发师信息失败", err)
        })
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
    appointment(e) {
        const id = this.data.barberInfo.id
        const userid = wx.getStorageSync('userid')
        if (!userid) {
            return wx.showToast({
                title: '请先登录',
                icon: 'error'
            })
        } else if (this.data.barberInfo.subscribeNum === 0) {
            return wx.showToast({
                title: '预约已满',
                icon: 'error'
            })
        }
        HTTP.appointmentBarber({
            userId: userid,
            hairdresserId: id
        }).then(res => {
            console.log(res)
            wx.showToast({
                title: res,
            });

            setTimeout(function () {
                wx.navigateBack({
                    delta: 1,
                })
            }, 1500)


        }).catch(err => {
            wx.showToast({
                title: err,
            })
        })
    },
})
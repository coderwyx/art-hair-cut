// pages/info/info.js
const checkPhone = /^1[3-9][0-9]{9}$/;
import HTTP from '../../../utils/requestFn/api'


Page({

    /**
     * 页面的初始数据
     */
    data: {
        birthday: "",
        gender: "",
        genderArray: ["女", "男"],
        name: "",
        phone: "",
        id: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const app = getApp();
        const userid = wx.getStorageSync('userid');
        HTTP.getUserInfo(userid).then(res => {
            console.log("成功获取用户信息", res)
            const {
                name,
                sex,
                tel
            } = res
            wx.setStorageSync('phone', tel)
            this.setData({
                name: name,
                phone: tel,
                gender: sex || ''
            })
        }).catch(err => {
            console.log("获取用户信息失败", err)

        })
        // wx.request({
        //     url: `http://35807s79k5.qicp.vip/custom/find/${userid}`,
        //     success(res) {
        //         console.log(res)
        //     },
        //     fail(err) {
        //         console.log(err)
        //     }
        // })
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
    bindBirthdayChange(e) {
        this.setData({
            birthday: e.detail.value,
        })
    },

    bindGenderChange(e) {
        console.log(e.detail.value)
        this.setData({
            gender: this.data.genderArray[e.detail.value],
        })
    },
    getName(e) {
        this.setData({
            name: e.detail.value,
        })
    },
    getPhone(e) {
        this.setData({
            phone: e.detail.value,
        })
        console.log(this.data.phone)
        // phone = e.detail.value;
    },
    changeInfo() {
        const {
            name,
            phone,
            gender
        } = this.data;
        if (phone != '' && !checkPhone.test(phone)) {
            wx.showToast({
                icon: "error",
                title: '手机号格式有误'
            })
            return
        }
        const userid = wx.getStorageSync('userid');
        HTTP.changeUserInfo({
            id: userid,
            name: name,
            tel: phone,
            sex: gender
        }).then(res => {
            wx.setStorageSync('phone', phone)

            wx.showToast({
                title: '保存成功',
            })
            setTimeout(function () {
                wx.navigateBack({
                    delta: 1,
                })
            }, 1500)
        }).catch(err => {
            wx.showToast({
                title: '修改失败，请稍后再试',
            })
        })


    }
})
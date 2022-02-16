// pages/discovery/disconveryInfo/discoveryInfo.js
import HTTP from '../../../utils/requestFn/api'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        productInfo: {

        },
        count: 1,
        type: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        const id = options.id
        HTTP.getProductInfo(id).then(res => {
            console.log(res)
            this.setData({
                productInfo: res
            })
        }).catch(err => {
            console.log(err)
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
    // 进入店铺
    toShop() {
        wx.navigateBack({
            delta: 1,
        })
    },
    // 进入购物车
    toShoppingCart() {
        wx.navigateTo({
            url: '../../information/shoppingCart/shoppingCart',
        })
    },
    // 加入购物车
    addProduct() {
       
        this.setData({
            show: false
        });
        const app = getApp()
        const shoppingCartList = app.globalData.shoppingCartList
        let originalProduct = shoppingCartList.find(item => {
            return item.id === this.data.productInfo.id
        })
        if (!originalProduct) {
            const count = this.data.count
            this.setData({
                ['productInfo.count']: count
            })
            // setTimeout(() => {
            shoppingCartList.push(this.data.productInfo)
            // }, 0)

        } else {
            originalProduct.count += this.data.count
        }
        wx.showToast({
            title: '已加入购物车',
        })

    },
    onClickHide() {

        this.setData({
            show: false
        });
    },
    onClickShow(e) {
        const id = e.currentTarget.dataset.id
        console.log(id)
        this.setData({
            type: id,
            show: true
        });
        console.log(this.data.type)
    },
    cancerEven() {
        return
    },
    onChange(event) {
        this.setData({
            // ['productInfo.count']: event.detail
            count: event.detail
        })
        console.log(this.data.productInfo.count)
    },
    buyNow() {
        const userid = wx.getStorageSync('userid')
        if (!userid) {
            return wx.showToast({
                title: '请先登录',
                icon: 'error'
            })
        }
        const productInfo = JSON.stringify(this.data.productInfo)
        const count = this.data.count
        wx.navigateTo({
            url: '../productOrder/productOrder?productInfo=' + productInfo + '&count=' + count,
        })
    }
})
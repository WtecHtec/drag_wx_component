// pages/drag-page/index.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        drapTimer: null,
        drapPlaceIndex: -1,
        drapPlaceHeight: 0,
        dragIndex: -1,
        drapTop: 0,
        elQuery: null,
        dragList: [
            {
                type: 1,
                name: 'a1',
            },
            {
                type: 1,
                name: 'aa2',
            },
            {
                type: 2,
                name: 'aaa3',
            },
            {
                type: 1,
                name: 'aaa4',
            },
            {
                type: 1,
                name: 'aaa5',
            },
            {
                type: 2,
                name: 'aaaa6',
            },
            {
                type: 1,
                name: 'a7',
            },
            {
                type: 1,
                name: 'aaa4',
            },
            {
                type: 1,
                name: 'aaa5',
            },
            {
                type: 2,
                name: 'aaaa6',
            },
        ]
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

  


 
    bindEndDrag(event) {
        console.log(event)
        let { dragList } = event.detail
        this.setData({
            dragList,
        })
    },
   

})
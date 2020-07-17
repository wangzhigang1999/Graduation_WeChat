// pages/uploadMyInfo/uploadFinishPage/uploadFinishPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uuid: "",
        userName: "",
        remark: "",
        openId: '',
        userFinalImg: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      userName: options.userName,
      remark: options.remark,
      uuid: options.uuid,
      openId: options.openId,
      userFinalImg: options.userFinalImg
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
    wx.switchTab({
      url: '/pages/myprofile/myprofile',
    })
  },
  backToMyprofile: function() {
    this.onUnload()
  },



  confirmUpload: function() {
    wx.request({
      url: 'https://www.bupt.site/graduation/user/confirmUpload',
      data:{
        uuid: this.data.uuid,
        openId: this.data.openId
      },
      method: "GET",
      success(res){
        if(res.data.success==true){
          wx.showToast({
            title: '已成功确认',
            icon: "success",
            duration: 800
          })
        } else {
          wx.showToast({
            title: '确认失败',
            icon: "loading",
            duration: 800
          })
        }
      }
    })
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

  }
})
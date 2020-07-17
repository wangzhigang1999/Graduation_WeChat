// pages/AdminPages/CreatePhotoPreview/CreatePhotoPreview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uuid: "",
    studentNumber: "",
    schoolName: "",
    imageName: "",
    prePhotoURL: "",
    confrimedTag: false,
    openId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      uuid: options.uuid,
      studentNumber: options.studentNumber,
      schoolName: options.schoolName,
      imageName: options.imageName,
      prePhotoURL: options.prePhotoURL,
      openId: options.openId
    })
  },

  BtnToConfrim: function(){
    this.data.confrimedTag = true;
    wx.request({
      url: 'https://www.bupt.site/graduation/admin/releaseConfirm',
      method: "GET",
      data: {
        uuid: this.data.uuid
      },
      success(res){
        console.log(res)
        if(res.data.success==true){
          wx.showToast({
            title: '发布成功',
            icon: "success",
            duration: 800
          })
        } else {
          wx.showToast({
            title: '发布失败',
            icon: "loading",
            duration: 800
          })
        }
      }
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
    if(this.data.confrimedTag){
      wx.switchTab({
        url: '/pages/myprofile/myprofile',
      })
    }
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
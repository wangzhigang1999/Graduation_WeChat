// pages/CreatePages/CreatePageBasicInfo/CreatePageBasicInfo.js
Page({
  submitEvent: function(event){
    var infoBasic = event.detail.value;
    if(infoBasic.numOfPeople>36){
      wx.showToast({
        title: '本程序最多支持36人',
        icon: "none",
        duration: 500
      })
      return
    }
    if(infoBasic.photoName==""){
      wx.showToast({
        title: '合影名称为空',
        icon: "none",
        duration: 500
      })
      return
    }
    if(infoBasic.graduateSchool==""){
      wx.showToast({
        title: '毕业院校为空',
        icon: "none",
        duration: 500
      })
      return
    }
    if(infoBasic.graduateClass==""){
      wx.showToast({
        title: '毕业班级为空',
        icon: "none",
        duration: 500
      })
      return
    }
    if(infoBasic.numOfPeople==""){
      wx.showToast({
        title: '合影人数为空',
        icon: "none",
        duration: 500
      })
      return
    }
    wx.navigateTo({
      url: '/pages/CreatePages/ImageCropper/ImageCropper?photoName=' + infoBasic.photoName + '&graduateSchool=' + infoBasic.graduateSchool + '&graduateClass=' + infoBasic.graduateClass + '&numOfPeople=' + infoBasic.numOfPeople + '&otherInfo=' + infoBasic.otherInfo+ "&openId="+ this.data.openId,
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    openId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openId: options.openId
    })
    console.log(this.data.openId)
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

  }
})
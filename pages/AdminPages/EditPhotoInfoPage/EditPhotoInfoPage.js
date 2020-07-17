// pages/CreatePages/CreatePageBasicInfo/CreatePageBasicInfo.js
Page({
  submitEvent: function(event){
    let self = this;
    var infoBasic = event.detail.value;
    // 对未改变的值进行设置
    if(infoBasic.graduateSchool==""){
      infoBasic.graduateSchool = this.data.schoolName
    }
    if(infoBasic.graduateClass==""){
      infoBasic.graduateClass = this.data.classNumber
    }
    if(infoBasic.otherInfo==""){
      infoBasic.otherInfo = this.data.otherInfo
    }
    if(infoBasic.photoName==""){
      infoBasic.photoName = this.data.imageName
    }
    console.log(infoBasic)
    wx.request({
      url: 'https://www.bupt.site/graduation/admin/changeBasicInfo',
      method: "GET",
      data: {
        uuid: this.data.photoId,
        imgName: infoBasic.photoName,
        schoolName:infoBasic.graduateSchool,
        className:infoBasic.graduateClass,
        otherInfo:infoBasic.otherInfo,
        openId: this.data.openId
      },
      success(res){
        console.log(res.data)
        if(res.data.success==true) {
          wx.showToast({
            title: '更改成功',
            icon: "success",
            duration: 500
          })
          self.setData({
            imgName: infoBasic.photoName,
            schoolName:infoBasic.graduateSchool,
            className:infoBasic.graduateClass,
            otherInfo:infoBasic.otherInfo,
          })
        } else {
          wx.showToast({
            title: '更改失败',
            icon: "loading",
            duration: 500
          })
        }
        
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    backImg: "",
    photoId: "",
    imageName:"",
    schoolName:"",
    classNumber: "",
    otherInfo: "",
    openId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    this.setData({
      backImg: options.backImg,
      photoId: options.photoId,
      imageName: options.imageName,
      schoolName: options.schoolName,
      classNumber: options.classNumber,
      otherInfo: options.otherInfo,
      openId: options.openId
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

  }
})
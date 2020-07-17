// pages/uploadMyInfo/uploadMyBasicInfo/uploadMyBasicInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uuid: "",
    userName: "",
    userRemark: "",
    openId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(options)
    this.setData({
      uuid: options.uuid,
      userName: options.userName,
      userRemark: options.userRemark,
      openId: options.openId
    })
  },
  submitEvent: function(event){
    let self = this;
    var infoBasic = event.detail.value;
    
    if(infoBasic.userName==""){
      infoBasic.userName = this.data.userName
    }
    if(infoBasic.userRemark==""){
      infoBasic.userRemark = this.data.userRemark
    }
    console.log(infoBasic)
    wx.request({
      url: 'https://www.bupt.site/graduation/user/changeBasicInfo',
      method: "GET",
      data: {
        uuid: this.data.uuid,
        openId: this.data.openId,
        userName: infoBasic.userName,
        remark: infoBasic.userRemark
      },
      success(res){
        console.log(res)
        if(res.data.success==true){
          wx.showToast({
            title: '修改成功',
            icon: "success",
            duration: 800
          })
          self.setData({
            userName: infoBasic.userName,
            userRemark: infoBasic.userRemark
          })
        } else {
          wx.showToast({
            title: '修改失败',
            icon: "loading",
            duration: 800
          })
        }
      }
    })
    
  },
  
})
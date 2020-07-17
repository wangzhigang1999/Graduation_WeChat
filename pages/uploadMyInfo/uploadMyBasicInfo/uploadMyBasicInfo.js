// pages/uploadMyInfo/uploadMyBasicInfo/uploadMyBasicInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uuid: "",
    openId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.uuid)
    this.setData({
      uuid: options.uuid,
      openId: options.openId
    })
  },
  submitEvent: function(event){
    var infoBasic = event.detail.value;
    console.log(infoBasic)
    console.log(this.data.uuid)
    if(infoBasic.userName==""){
      wx.showToast({
        title: '个人姓名为空',
        icon: "none",
        duration: 500
      })
      return
    }
    if(infoBasic.remark==""){
      wx.showToast({
        title: '备注为空',
        icon : "none",
        duration: 500
      })
      return
    }
    wx.navigateTo({
      url: '/pages/uploadMyInfo/imageCropperForMine/imageCropperForMine?uuid=' + this.data.uuid + "&userName=" + infoBasic.userName + "&remark=" + infoBasic.remark+ "&openId=" +this.data.openId,
    })
  },
  
})
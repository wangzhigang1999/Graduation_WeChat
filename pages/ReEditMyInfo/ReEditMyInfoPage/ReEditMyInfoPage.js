// pages/ReEditMyInfo/ReEditMyInfoPage/ReEditMyInfoPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uuid: "",
    openId: "",
    userName: "",
    status: "",
    userFinalImg: "",
    userRemark: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(options)
    this.setData({
      uuid: options.uuid,
      openId: options.openId
    })
    // this.onFresh()
  },

  onFresh: function() {
    let self = this;
    // 获取个人信息
    wx.request({
      url: 'https://www.bupt.site/graduation/user/getMyPhotoInfoBeforeChangeIt',
      data: {
        uuid: this.data.uuid,
        openId: this.data.openId
      },
      method: "GET",
      success(res){
        const userFinalImg = "https://www.bupt.site" + res.data.data.userFinalImg
        if(res.data.success==true){
          self.setData({
            userName: res.data.data.userName,
            status: res.data.data.status,
            userFinalImg: userFinalImg,
            userRemark: res.data.data.userRemark
          })
        } else {
          wx.showToast({
            title: '数据请求失败',
            icon: "loading",
            duration: 800
          })
        }
      }
    })
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
  },

  changeBasicInfo: function(){
    if(this.data.status==2){
      wx.navigateTo({
        url: '/pages/ReEditMyInfo/changeBasicInfoPage/changeBasicInfoPage?uuid='+this.data.uuid+"&userName="+this.data.userName+"&userRemark="+this.data.userRemark + "&openId=" + this.data.openId,
      })
    } else {
      wx.showToast({
        title: '已确认无法更改',
        icon: "none",
        duration: 800
      })
    }
    
  },
  changeImage: function() {
    if(this.data.status==2){
      wx.navigateTo({
        url: '/pages/ReEditMyInfo/imageCroppperForReEdit/imageCroppperForReEdit?uuid='+this.data.uuid+ "&openId=" + this.data.openId,
      })
    } else {
      wx.showToast({
        title: '已确认无法更改',
        icon: "none",
        duration: 800
      })
    }
  },
  confirmUpload: function() {
    let self = this;
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
          self.data.status = 3;
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onPullDownRefresh()
    console.log(this.data)
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
    this.onFresh(); 
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
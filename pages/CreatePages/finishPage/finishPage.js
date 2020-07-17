// pages/CreatePages/finishPage/finishPage.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoSrc: '',
    photoName : '',
    graduateSchool : '',
    graduateClass : '',
    numOfPeople : '',
    otherInfo : '',
    uuid: '',
    openId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var cropperImg = options.cropperImg;
    this.setData({
      photoSrc: cropperImg,
      photoName : options.photoName,
      graduateSchool : options.graduateSchool,
      graduateClass : options.graduateClass,
      numOfPeople : options.numOfPeople,
      otherInfo : options.otherInfo,
      uuid: options.uuid,
      openId: options.openId
    });
    
  },


  shareJoined: function(){

  },

  toMyProfile: function(){
    wx.navigateTo({
      url: '/pages/uploadMyInfo/uploadMyBasicInfo/uploadMyBasicInfo?uuid=' + this.data.uuid + "&openId=" + this.data.openId,
    })
  },
   /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.switchTab({
      url: '/pages/index/index',
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
  onShareAppMessage: function (res) {
    let self= this;
    
    return {
      title: "邀请加入："+"["+ self.data.photoName + ']',
      imageUrl: self.data.photoSrc,
      path: '/pages/JoinPages/JoinConfrimPage/JoinConfirm?uuid=' + self.data.uuid
    }   
  }
})
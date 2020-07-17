// pages/uploadMyInfo/imageCropperForMine/imageCropperForMine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'cloud://text-aczvw.7465-text-aczvw-1300309057/testPic/图片预览区域@2x.png',
    width:230,//宽度
    height: 230,//高度
    uuid: "",
    userName: "",
    remark: "",
    openId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.cropper = this.selectComponent("#image-cropper");
    console.log(options)
    this.setData({
      openId: options.openId,
      uuid: options.uuid,
      userName: options.userName,
      remark: options.remark,
      src:"cloud://text-aczvw.7465-text-aczvw-1300309057/testPic/图片预览区域@2x.png",
    })
    wx.showLoading({
      title: "加载中"
    })
  },
  // 选择照片按钮响应
  BtnToPickPhoto: function (){
    var _this  = this;
    wx.chooseImage({
        count: 1,
        sizeType: ['compressed','original'],
        sourceType: ['album','camera'],
        success: function (res) {
          var tempFilePaths = res.tempFilePaths;
          _this.setData({
            src: tempFilePaths
          });
          console.log(tempFilePaths)
        }
      })
  },
BtnToConfirm: function() {
  // 获取照片地址
  this.cropper.getImg((obj)=>{
    let self = this;
    console.log(obj.url);
    wx.showLoading({
      title:"自动去除背景中"
    })
    wx.uploadFile({
      url: 'https://www.bupt.site/graduation/user/uploadImage',
      filePath: obj.url,
      name: 'file',
      formData: {
        openId: this.data.openId,
        uuid: this.data.uuid,
      },
      success(res){
        wx.hideLoading({
          complete: (res) => {},
        })
        console.log(res)
        const data = res.data
        
        const result  = JSON.parse(data)
        
        if(result.success==true){
          wx.showToast({
            title: '扣图成功',
            icon: "success",
            duration: 500
          })
          const ImgUrl = "https://www.bupt.site" + result.data.url
          setTimeout(function(){
            wx.navigateTo({
              url: '/pages/uploadMyInfo/imageComposeForMine/imageComposeForMIne?uuid=' + self.data.uuid + '&openId=' + self.data.openId + '&remark=' + self.data.remark + '&userTempImg=' + ImgUrl + "&userName=" + self.data.userName,
            })
          },100)
        } else {
          wx.showToast({
            title: '扣图失败',
            icon: "loading",
            duration: 500
          })
        }
      }
    })
  })
},
cropperload(e){
    console.log("cropper初始化完成");
},
loadimage(e){
    console.log("图片加载完成",e.detail);
    wx.hideLoading();
    //重置图片角度、缩放、位置
    this.cropper.imgReset();
},
clickcut(e) {
    console.log(e.detail);
    //点击裁剪框阅览图片
    wx.previewImage({
        current: e.detail.url, // 当前显示图片的http链接
        urls: [e.detail.url] // 需要预览的图片http链接列表
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
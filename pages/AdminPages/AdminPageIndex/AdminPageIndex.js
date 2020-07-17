// pages/AdminPages/AdminPageIndex/AdminPageIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backImg: "",
    photoId: "",
    imageName:"",
    schoolName:"",
    studentNumber: "",
    status:"",
    joined:"",
    confirmed:"",
    classNumber:"",
    otherInfo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      photoId: options.photoId,
      openId: options.openId
    })
  },
  // 刷新部分数据函数
  onfresh: function() {
    let self = this;
    wx.request({
      url: 'https://www.bupt.site/graduation/user/getPhotoInfoByInvitationCode',
      method: "GET",
      header: {
        'content-type': "application/json"
      },
      data: {
        uuid : this.data.photoId,
      },
      success(res) {
        const result = res.data
        console.log(result)
        if(result.success==false){
          wx.showToast({
            title: '刷新失败',
          })
        } else {
          const backImg = "https://www.bupt.site" + result.data.photo.backgroundImg
          self.setData({
            backImg: backImg,
            imageName: result.data.photo.imageName,
            schoolName: result.data.photo.schoolName,
            studentNumber: result.data.photo.studentNumber,
            status: result.data.photo.status,
            joined: result.data.joined,
            confirmed: result.data.confirmed,
            otherInfo: result.data.photo.otherInfo,
            classNumber: result.data.photo.classNumber
          })
        }
      }
    })
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
  },



  // 点击事件处理
  EditPhotoInfo: function(){
    wx.navigateTo({
      url: '/pages/AdminPages/EditPhotoInfoPage/EditPhotoInfoPage?backImg=' + this.data.backImg + "&photoId=" + this.data.photoId + "&imageName=" + this.data.imageName + "&schoolName=" + this.data.schoolName + "&classNumber=" + this.data.classNumber + "&otherInfo=" + this.data.otherInfo + "&openId=" + this.data.openId,
    })
  },
  EditBackImg: function() {
    wx.navigateTo({
      url: '/pages/AdminPages/EditBackImg/EditBackImgPage?uuid='+ this.data.photoId + "&backImg=" + this.data.backImg + "&openId=" + this.data.openId,
    })
  },
  EditPeopleArray: function(){
    if(this.data.status==1){
      wx.showToast({
        title: '待所有人确认',
        icon: "none",
        duration: 500
      })
    } else {
      wx.navigateTo({
        url: '/pages/AdminPages/EditPeopleArray/EditPeopleArrayPage?uuid='+this.data.photoId+ "&studentNumber="+ this.data.studentNumber + "&openId=" + this.data.openId,
      })
    }
  },
  CreateFinalPhoto: function() {
    let self = this;
    if(this.data.status==1){
      wx.showToast({
        title: '待所有人确认',
        icon: "none",
        duration: 500
      })
    } else {
      wx.showLoading({
        title: "正在生成预览"
      })
      wx.request({
        url: 'https://www.bupt.site/graduation/admin/generate',
        data: {
          uuid: this.data.photoId
        },
        method: "GET",
        success(res){
          wx.hideLoading({
            complete: (res) => {},
          })
          console.log(res.data)
          
          if(res.data.success){
            const prePhotoURL = "https://www.bupt.site" + res.data.data
            wx.navigateTo({
              url: '/pages/AdminPages/CreatePhotoPreview/CreatePhotoPreview?uuid=' + self.data.photoId + "&prePhotoURL=" + prePhotoURL + "&studentNumber=" + self.data.studentNumber + "&schoolName=" + self.data.schoolName + "&imageName=" + self.data.imageName + "&openId=" + self.data.openId,
            })
          } else {
            if(res.data.msg=="Please wait for everyone to join and sort") {
              wx.showToast({
                title: '请进行人员排列',
                icon: "loading",
                duration: 800
              })
              return
            }
            wx.showToast({
              title: '预览失败',
              icon: "loading",
              duration: 800
            })
          }
        }
      })
      
    }
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
    this.onfresh(); 
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
    let self= this;
    
    return {
      title: "邀请加入："+"["+ self.data.imageName + ']',
      imageUrl: self.data.backImg,
      path: '/pages/JoinPages/JoinConfrimPage/JoinConfirm?uuid=' + self.data.photoId
    }   
  }
})
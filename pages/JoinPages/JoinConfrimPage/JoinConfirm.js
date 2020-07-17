// pages/JoinPages/JoinConfrimPage/JoinConfirm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backgroundImg: '',
    photoName: '',
    schoolName: '',
    studentNumber: '',
    uuid: '',
    openId: '',
    isJoined: false,
    btnText: '确认加入',
    joined: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(options);
    if(options.openId==null){
      let self = this
      wx.cloud.init({
      env: 'text-aczvw',
      traceUser: true
      })
      wx.cloud.callFunction({
        name: 'getOpenId',
        complete: res => {
          console.log(res)
          self.setData({
            openId: res.result.openid,
            uuid: options.uuid
          })
        }
    })
    wx.request({
      url: 'https://www.bupt.site/graduation/user/getPhotoInfoByInvitationCode',
      method: "GET",
      header: {
        'content-type': "application/json"
      },
      data: {
        uuid : options.uuid,
      },
      success(res) {
        console.log(res.data);
        if(res.data.success==false) {
          wx.showToast({
            icon: "loading",
            title: '邀请码不存在',
            duration: 500
          })
        } else {
          var backgroundImgUrl = "https://www.bupt.site" + res.data.data.photo.backgroundImg
          console.log(res.data.data.photo)
          self.setData({
            backgroundImg: backgroundImgUrl,
            photoName: res.data.data.photo.imageName,
            schoolName: res.data.data.photo.schoolName,
            studentNumber: res.data.data.photo.studentNumber,
            joined: res.data.data.joined
          })
        }
      },
    })
    } else {
      this.setData({
        backgroundImg: options.backgroundImg,
        photoName: options.photoName,
        schoolName: options.schoolName,
        studentNumber: options.studentNumber,
        uuid: options.uuid,
        openId: options.openId,
        joined: options.joined
      })
    }
    
    console.log(this.data)
  },

  BtnToJoin: function() {
    let self = this
    wx.request({
      url: 'https://www.bupt.site/graduation/user/isJoined',
      data: {
        openId: this.data.openId,
        uuid: this.data.uuid
      },
      method: "GET",
      success(res){
        if(res.data==true) {
          self.setData({
            isJoined: true
          })
        } 
      }
    })
    if(this.data.isJoined){
      wx.showToast({
        title: '您已经加入合影',
        icon: "none",
        duration: 500
      })
      return
    } else {
      if(this.data.joined>=this.data.studentNumber){
        wx.showToast({
          title: '人数已满',
          icon: "loading",
          duration: 500
        })
    } else {
      wx.request({
        url: 'https://www.bupt.site/graduation/user/join',
        method: "GET",
        header: {
          'content-type': "application/json"
        },
        data: {
          uuid : this.data.uuid,
          openId: this.data.openId
        },
        success(res) {
          console.log(res.data);
          
          if(res.data.success==false) {
            var message = "加入失败"
            if (res.data.msg=="Already joined"){
              message = "您已经加入"
              this.isJoined = true;
            } else {
              message = "加入失败"
            }
            wx.showToast({
              icon: "loading",
              title: message,
              duration: 500
            })
            
          } else {
            self.data.isJoined = true;
            wx.showToast({
              icon: "success",
              title: '加入成功',
              duration: 500
            })
          }
        },
      })
    }
    }
    console.log(this.data.uuid)
    console.log(this.data.openId)
    
    
  },
  BtnToMyprofile: function(){
    if(this.data.isJoined==true){
      wx.navigateTo({
        url: '/pages/uploadMyInfo/uploadMyBasicInfo/uploadMyBasicInfo?uuid=' + this.data.uuid + "&openId=" + this.data.openId,
      })
    } else {
      wx.showToast({
        icon: "none",
        duration: 500,
        title: '请先确认加入'
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
  onShareAppMessage: function (res) {
      let self= this;
    if(res.from==='button'){
      console.log(res.target,res)
    }
    return {
      title: "邀请加入："+"["+ self.data.photoName + ']',
      imageUrl: self.data.backgroundImg,
      path: '/pages/JoinPages/JoinConfrimPage/JoinConfirm?uuid=' + self.data.uuid
    }           
  }
})
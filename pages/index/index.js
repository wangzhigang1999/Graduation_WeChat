
//index.js
//获取应用实例


Page({
  onLoad: function(options) {
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
          openId: res.result.openid
        })
       }
    })
    
  },
  BtnToCreatePage: function(options){
    
    wx.navigateTo({
      url: '/pages/CreatePages/CreatePageBasicInfo/CreatePageBasicInfo?openId=' + this.data.openId,
    })
    console.log(this.data.openId)
  },
  
  submitform: function(e){
    let self = this;
    let uuid1  = e.detail.value.uuidCode
    if(uuid1==""){
      wx.showToast({
        title: '请填写邀请码',
        icon: "none",
        duration: 500
      })
      return
    }
    // 先执行搜索
    wx.showLoading({
      title: '查找中',
    })
    wx.request({
      
      url: 'https://www.bupt.site/graduation/user/getPhotoInfoByInvitationCode',
      method: "GET",
      header: {
        'content-type': "application/json"
      },
      data: {
        uuid : uuid1,
      },
      success(res) {
        console.log(uuid1)
        console.log(res.data);
        if(res.data.success==false) {
          wx.showToast({
            icon: "loading",
            title: '邀请码不存在',
            duration: 500
          })
        } else {
          wx.showToast({
            icon: "successs",
            title: '查找成功',
            duration: 500
          })
          var backgroundImgUrl = "https://www.bupt.site" + res.data.data.photo.backgroundImg
          console.log(res.data.data.photo)
          setTimeout(function(){
            wx.navigateTo({
              url: '/pages/JoinPages/JoinConfrimPage/JoinConfirm?uuid=' + uuid1 + '&photoName=' + res.data.data.photo.imageName+'&studentNumber=' + res.data.data.photo.studentNumber + '&schoolName=' + res.data.data.photo.schoolName + '&backgroundImg='+ backgroundImgUrl+ "&openId=" + self.data.openId + "&joined=" + res.data.data.joined,
            })
          },100)
        }
      },
    })
  },
  data: {
    imgUrls: [
      {
        url: 'cloud://text-aczvw.7465-text-aczvw-1300309057/homeAdPic/轮播模板3-1.jpg'
      }, {
        url: 'cloud://text-aczvw.7465-text-aczvw-1300309057/homeAdPic/轮播模板2-1.jpg'
      }, {
        url: 'cloud://text-aczvw.7465-text-aczvw-1300309057/homeAdPic/轮播模板1-1.jpg'
      }
    ],
    indicatorDots: true,  //小点
    autoplay: true,  //是否自动轮播
    interval: 4000,  //间隔时间
    duration: 3000,  //滑动时间
    openId: '',
    uuidText: "请输入您的邀请码"
  },
  
  
})

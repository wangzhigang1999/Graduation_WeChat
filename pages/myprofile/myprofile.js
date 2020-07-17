
Page({
  data: {
    openId: '',
    Administrator: [],
    Joined: [],
    phtotoSize: [[288,600],[458,600],[628,600],[798,600],[968,600],[1138,600],[1308,600],[968,800],[968,800],[1308,800],[1308,800],[1308,800],[1388,800],[1477,800],[1557,800],[1388,900],[1388,900],[1388,900],[1388,900],[1388,900],[1388,900],[1477,900],[1477,900],[1477,900],[1817,900],[1817,900],[1817,900],[1817,900],[1817,900],[1700,700],[1870,900],[1870,900],[1920,900],[1920,900],[1920,900]]

  },
  // 数据加载与保存
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
    console.log(this.data.openId)
    setTimeout(function(){
      self.onfresh()
    },500)
    setTimeout(function(){
      self.onfresh()
    },1000)
  },
  onfresh: function(){
    let app = getApp()
    this.setData({
      openId: app.globalData.openId
    })
    console.log(this.data.openId)
    var that = this;
    wx.request({
      url: 'https://www.bupt.site/graduation/user/my',
      method: "GET",
      header: {
        'content-type': "application/json"
      },
      data: {
        openId: that.data.openId
      },
      success(res) {
        console.log(res)
        if(res.data.success==false) {
          wx.showToast({
            icon: "loading",
            title: '加载失败',
            duration: 500
          })
        } else {
          
          that.setData({
            Administrator: res.data.data.Administrator,
            Joined: res.data.data.Joined
          })
           
        }
      },
    })
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
  },
  onShow: function(){
    this.onfresh()
  },
  onPullDownRefresh: function () {
    this.onfresh(); //重新加载onLoad()
  },
// 点击管理列表事件处理
AdministratorItemBtn: function(e) {
  console.log(e.currentTarget.dataset)
  let index = e.currentTarget.dataset.index
  let item = this.data.Administrator[index]
  console.log(item)
  if(item.photo.status==3){
    wx.showToast({
      title: '已发布无法继续编辑',
      icon: 'loading',
      duration: 800
    })
  } else {
    wx.navigateTo({
    url: '/pages/AdminPages/AdminPageIndex/AdminPageIndex?&photoId=' + item.photo.photoId + "&openId=" + this.data.openId,
  })
  }
  
}

,
// 点击加入列表事件处理
JoinedItemBtn: function(e) {
  console.log(e.currentTarget.dataset)
  // 根据状态区分操作
  let index = e.currentTarget.dataset.index
  // 根据状态区分操作
  let item = this.data.Joined[index]
  console.log(item)
  if(item.userStatus=="待上传"){
    // 跳转至完成个人信息补全页面并传入uuid
    wx.navigateTo({
      url: '/pages/uploadMyInfo/uploadMyBasicInfo/uploadMyBasicInfo?uuid=' + item.photo.photoId + "&openId=" + this.data.openId,
    })
  } else if(item.userStatus=="已上传待确认"){
    // 跳转逻辑
    wx.navigateTo({
      url: '/pages/ReEditMyInfo/ReEditMyInfoPage/ReEditMyInfoPage?uuid=' + item.photo.photoId + "&openId=" + this.data.openId,
    })
    
    
  } else if(item.userStatus=="已确认待发布") {
    wx.showToast({
      title: '已确认无法修改',
      icon: "none",
      duration: 800
    })
  } else {
    let self = this;
    console.log("领取合照流程：")
    wx.request({
      url: 'https://www.bupt.site/graduation/user/getGroupPhoto',
      method: 'GET',
      data: {
        uuid: item.photo.photoId
      },
      success(res) {
        console.log(res)
        if(res.data.success == true){
          const backImg = "https://www.bupt.site" + item.photo.backgroundImg
          const peopleImg = "https://www.bupt.site" + res.data.data
          wx.navigateTo({
            url: '/pages/GetImagePages/ComposeImagePages/ComposeImagePages?backImg='+ backImg + "&peopleImg=" + peopleImg + "&uuid=" + item.photo.photoId + "&openId=" + self.data.openId+ "&w="+ self.data.phtotoSize[item.photo.studentNumber-1][0] + "&h="+ self.data.phtotoSize[item.photo.studentNumber-1][1],
          })
        } else {
          wx.showToast({
            title: '领取失败',
            icon: "loading",
            duration: 800
          })
        }
      }
    })
  }

}





})

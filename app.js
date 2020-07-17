//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //
    wx.cloud.init({
      env: 'text-aczvw',
      traceUser: true
    })
    wx.cloud.callFunction({
      name: 'getOpenId',
      complete: res => {
        let app = getApp() 
        app.globalData.openId = res.result.openid
        
       }
    })
  },
  globalData: {
    openId: "",
  },
  getOpenId: function(){
    wx.cloud.init({
      env: 'text-aczvw',
      traceUser: true
    })
    wx.cloud.callFunction({
      name: 'getOpenId',
      complete: res => {
        let app = getApp() 
        app.globalData.openId = res.result.openid
       }
    })
    return app.globalData.openId
  }
})

Page({
  data: {
      src:'cloud://text-aczvw.7465-text-aczvw-1300309057/testPic/图片预览区域@2x.png',
      width:384,//宽度
      height: 216,//高度
      photoName : '',
      graduateSchool : '',
      graduateClass : '',
      numOfPeople : 0,
      otherInfo : '',
      uuid: '',
      openId: ''
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
  // 创建合影页面响应
  BtnToConfirm: function() {
    wx.showLoading({
      title: '上传信息中'
    })
    const app = getApp
    var uuidModel = require('../utils/uuid/uuid.js')
    this.data.uuid = uuidModel.wxuuid().substring(0,8).toUpperCase();
    this.cropper.getImg((obj)=>{
      console.log(obj.url);
      var self = this;
      wx.request({
        url: 'https://www.bupt.site/graduation/admin/createBasicInfo',
        method: "GET",
        header: {
          'content-type': "application/x-www-form-urlencoded"
        },
        data: {
          uuid: this.data.uuid,
          imgName: this.data.photoName,
          schoolName: this.data.graduateSchool,
          className: this.data.graduateClass,
          studentNumber: this.data.numOfPeople,
          otherInfo: this.data.otherInfo,
          openId: this.data.openId
        },
        success(res) {
          
          console.log("上传创建结果返回：")
          console.log(res)
          
          let success = res.data.success;
          if (success == false) {
            console.log("创建失败")
            wx.showToast({
              title: '创建失败',
              icon: 'loading',
              duration: 500
            });
          } else {
            wx.uploadFile({
              url: 'https://www.bupt.site/graduation/admin/uploadBackgroundImg',
              filePath: obj.url,
              name: 'file',
              formData: {
                uuid: self.data.uuid
              },
              success(res) {
                const data = res.data
                console.log(data)
                let success = res.data.success;
                if(success==false){
                  wx.showToast({
                    title: '图片上传失败',
                    icon: 'loading',
                    duration: 500
                  });
                } else {
                  wx.showToast({
                    title: '创建成功',
                    icon: 'success',
                    duration: 500
                  });
                  setTimeout(function(){
                    wx.navigateTo({
                      url: '/pages/CreatePages/finishPage/finishPage?photoName=' + self.data.photoName + '&graduateSchool=' + self.data.graduateSchool + '&graduateClass=' + self.data.graduateSchool + '&numOfPeople=' + self.data.numOfPeople + '&otherInfo=' + self.data.otherInfo + '&uuid=' + self.data.uuid + '&cropperImg=' + obj.url + "&openId=" + self.data.openId,
                      });
                  },500)
                }
              }
            });
            
          }
        }
      });
    });
  },
  onLoad: function (options) {
    
//获取到image-cropper实例
      this.cropper = this.selectComponent("#image-cropper");
      //开始裁剪
      this.setData({
          photoName : options.photoName,
          graduateSchool : options.graduateSchool,
          graduateClass : options.graduateClass,
          numOfPeople : options.numOfPeople,
          otherInfo : options.otherInfo,
          src:"cloud://text-aczvw.7465-text-aczvw-1300309057/testPic/图片预览区域@2x.png",
          openId: options.openId
      });
      wx.showLoading({
        title: "加载中"
      })
      console.log(this.data.openId)
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
})
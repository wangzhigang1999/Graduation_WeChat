Page({
  data: {
      src:'cloud://text-aczvw.7465-text-aczvw-1300309057/testPic/图片预览区域@2x.png',
      width:384,//宽度
      height: 216,//高度
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
  // 更改合影页面响应
  BtnToConfirm: function() {
    wx.showLoading({
      title:"上传中"
    })
    this.cropper.getImg((obj)=>{
      console.log(obj.url);
      var self = this;
      wx.uploadFile({
        url: 'https://www.bupt.site/graduation/admin/changeBackgroundImg',
        filePath: obj.url,
        name: 'file',
        formData: {
          uuid: this.data.uuid,
        },
        success(res){
          wx.hideLoading({
            complete: (res) => {},
          })
          console.log(res)
          const result  = JSON.parse(res.data)
          if(result.success==true){
            wx.showToast({
              title: '更改成功',
              icon: "success",
              duration: 500
            })
          } else {
            wx.showToast({
              title: '上传失败',
              icon: "loading",
              duration: 500
            })
          }
        }
      })
    });
  },
  onLoad: function (options) {
    
//获取到image-cropper实例
      this.cropper = this.selectComponent("#image-cropper");
      //开始裁剪
      this.setData({
          uuid: options.uuid,
          openId: options.openId
      });
      wx.showLoading({
        title: "加载中"
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
})
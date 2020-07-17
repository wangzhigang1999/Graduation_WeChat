// pages/GetImagePages/ComposeImagePages/ComposeImagePages.js
import CanvasDrag from '../../../component/canvas-drag/canvas-drag';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
      stickers: ['../../../images/sticker/1.png',
      '../../../images/sticker/2.png',
      '../../../images/sticker/3.png',
      '../../../images/sticker/4.png',
      '../../../images/sticker/5.png',
      '../../../images/sticker/6.png',
      '../../../images/sticker/7.png',
      '../../../images/sticker/8.png',
      '../../../images/sticker/9.png',
      '../../../images/sticker/10.png',
      '../../../images/sticker/11.png'],
        graph: {},
    openId: "",
    backImg: "",
    peopleImg: "",
    uuid: "",
    w: 0,
    h: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      openId: options.openId,
      backImg: options.backImg,
      peopleImg: options.peopleImg,
      uuid: options.uuid
    })
  },
  /**
     * 添加测试图片
     */
    onAddTest() {
      this.setData({
          graph: {
              w: 120,
              h: 120,
              type: 'image',
              url: '../../assets/images/test.jpg',
          }
      });
  },

  /**
   * 添加图片
   */
  onAddImage() {
      wx.chooseImage({
          success: (res) => {
              this.setData({
                  graph: {
                      w: 200,
                      h: 200,
                      type: 'image',
                      url: res.tempFilePaths[0],
                  }
              });
          }
      })
  },

  /**
   * 添加文本
   */
  onAddText() {
      this.setData({
          graph: {
              type: 'text',
              text: 'helloworld',
          }
      });
  },

  /**
   * 导出图片
   */
  onExport() {
      CanvasDrag.export()
          .then((filePath) => {
              console.log(filePath);
              wx.previewImage({
                  urls: [filePath]
              })
          })
          .catch((e) => {
              console.error(e);
          })
  },

  /**
   * 改变文字颜色
   */
  onChangeColor() {
      CanvasDrag.changFontColor('blue');
  },

  /**
   * 改变背景颜色
   */
  onChangeBgColor() {
      CanvasDrag.changeBgColor('yellow');
  },

  /**
   * 改变背景照片
   */
  onChangeBgImage() {
      CanvasDrag.changeBgImage('../../assets/images/test.jpg');
  },

  /**
   * 导出当前画布为模板
   */
  onExportJSON(){
      CanvasDrag.exportJson()
        .then((imgArr) => {
          console.log(JSON.stringify(imgArr));
      })
        .catch((e) => {
            console.error(e);
        });
  },

  onImport(){
      // 有背景
      // let temp_theme = [{"type":"bgColor","color":"yellow"},{"type":"image","url":"../../assets/images/test.jpg","y":98.78423143832424,"x":143.78423143832424,"w":104.43153712335152,"h":104.43153712335152,"rotate":-12.58027482265038,"sourceId":null},{"type":"text","text":"helloworld","color":"blue","fontSize":24.875030530031438,"y":242.56248473498428,"x":119.57012176513672,"w":116.73966979980469,"h":34.87503053003144,"rotate":8.873370699754087}];
      // 无背景
      let temp_theme = [{"type":"image","url":"../../assets/images/test.jpg","y":103,"x":91,"w":120,"h":120,"rotate":0,"sourceId":null},{"type":"text","text":"helloworld","color":"blue","fontSize":20,"y":243,"x":97,"rotate":0}];

      CanvasDrag.initByArr(temp_theme);
  },

  addImg: function(e){
    var img = e.currentTarget.dataset.url;
    console.log(img)
    var imgRelated = img.substring(8,img.length)
    console.log(imgRelated)
    this.setData({
      graph: {
          w: 120,
          h: 120,
          type: 'image',
          url: imgRelated,
      }
  });
  },

  onClearCanvas:function(event){
    let _this = this;
    _this.setData({canvasBg:null});
    CanvasDrag.clearCanvas();
},

onUndo:function(event){
    CanvasDrag.undo();
},
onLoad(options){
  wx.showLoading({
    title: '加载中',
  })
  console.log(options)
  var image = ""
  var image2 = ""
  wx.downloadFile({
    url: options.backImg,
    success: (res) => {
      wx.hideLoading({
        complete: (res) => {
        },
      })
        image = res.tempFilePath;
        console.log(image)
        CanvasDrag.changeBgImage(image);
    }
  })
  wx.showLoading({
    title: "加载背景中",
  }),
  wx.downloadFile({
    url: options.peopleImg, 
    success: (res) => {
      
        image2 = res.tempFilePath;
        console.log(image2)
        this.setData({
          graph:{
            w: options.w/3.2,
            h: options.h/3.2,
            type: 'image',
            url: image2
          },
        })
    }
  })
    this.setData({
      w: options.w,
      h: options.h,
      uuid: options.uuid,
      openId: options.openId,
      backImg: options.backImg,
      peopleImg: options.peopleImg
    });
},
Sharephoto: function(){
  CanvasDrag.export()
          .then((filePath) => {
              console.log(filePath);
              wx.previewImage({
                  urls: [filePath]
              })
          })
          .catch((e) => {
              console.error(e);
          })
},
SavePhoto: function(){
  CanvasDrag.export()
          .then((filePath) => {
              console.log(filePath);
              wx.saveImageToPhotosAlbum({
                filePath: filePath,
                success(res){
                  wx.showToast({
                    title: '保存成功',
                    icon: "success",
                    duration: 800
                  })
                },
                fail(res){
                  wx.showToast({
                    title: '保存失败',
                    icon: "loading",
                    duration: 800
                  })
                }
              })
          })
          .catch((e) => {
              console.error(e);
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
//index.js
import CanvasDrag from '../../../component/canvas-drag/canvas-drag';

Page({
    data: {
        stickers: ['../../../images/peopleSticker/1.png',
        '../../../images/peopleSticker/2.png',
        '../../../images/peopleSticker/2.png',
        '../../../images/peopleSticker/3.png',
        '../../../images/peopleSticker/4.png',
        '../../../images/peopleSticker/5.png',
        '../../../images/peopleSticker/6.png',
        '../../../images/peopleSticker/7.png',
        '../../../images/peopleSticker/8.png',
        '../../../images/peopleSticker/9.png'],
        graph: {},
        uuid: "",
        openId: '',
        userTempImg: "",
        stikerSize: [[233,159],[233,159],[233,159],[357,757],[357,757],[357,757],[357,757],[357,757],[357,757]]
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

    onUnload: function () {
      
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
      var index = 0
      if(imgRelated=="/images/peopleSticker/1.png"){
        index = 0
      }
      if(imgRelated=="/images/peopleSticker/2.png"){
        index = 1
      }
      if(imgRelated=="/images/peopleSticker/3.png"){
        index = 2
      }
      if(imgRelated=="/images/peopleSticker/4.png"){
        index = 3
      }
      if(imgRelated=="/images/peopleSticker/5.png"){
        index = 4
      }
      if(imgRelated=="/images/peopleSticker/6.png"){
        index = 5
      }
      if(imgRelated=="/images/peopleSticker/7.png"){
        index = 6
      }
      if(imgRelated=="/images/peopleSticker/8.png"){
        index = 7
      }
      if(imgRelated=="/images/peopleSticker/9.png"){
        index = 8
      }
      console.log(index)
      console.log(this.data.stikerSize)
      this.setData({
        graph: {
            w: this.data.stikerSize[index][0]/2,
            h: this.data.stikerSize[index][1]/2,
            type: 'image',
            url: imgRelated,
        }
    });
    },

    BtnToConfirm: function(){
    CanvasDrag.changeBgImage('');
      wx.showLoading({
        title: "上传中"
      })
      let self = this;
      CanvasDrag.export()
      .then((filePath) => {
          console.log(filePath);
          // wx.previewImage({
          //     urls: [filePath]
          // })
          // 进行上传处理
          // 先上传个人的信息

          
                  wx.uploadFile({
                    filePath: filePath,
                    name: 'file',
                    url: 'https://www.bupt.site/graduation/user/uploadFinalImage',
                    formData: {
                      uuid: self.data.uuid,
                      openId: self.data.openId
                    },
                    success(res){
                      console.log(res)
                      const result  = JSON.parse(res.data)
                      if(result.success==false){
                        CanvasDrag.changeBgImage('../../images/个人肖像范例.jpg');
                        wx.showToast({
                          title: '上传个人照片失败',
                          icon: "loading",
                          duration: 800
                        })
                      } else {
                        CanvasDrag.changeBgImage('../../images/个人肖像范例.jpg');
                        wx.showToast({
                          title: '上传成功',
                          icon: "success",
                          duration: 500
                        })
                        
                      }
                    }
                  })
              }
      )
      .catch((e) => {
          console.error(e);
      })
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
        CanvasDrag.changeBgImage('../../images/个人肖像范例.jpg');
        var image = ""
        wx.showLoading({
          title: '加载图片中',
        })
        wx.downloadFile({
          url: options.userTempImg, 
          success: (res) => {
              wx.hideLoading({
                complete: (res) => {},
              })
              image = res.tempFilePath;
              console.log(image)
              this.setData({
                graph:{
                  w: 200,
                  h: 200,
                  type: 'image',
                  url: image
                },
                userName: options.userName,
                remark: options.remark,
                uuid: options.uuid,
                openId: options.openId,
              })
          }
        })
      }
});

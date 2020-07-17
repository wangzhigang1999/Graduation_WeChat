var x,y,x1,y1,x2,y2,index,currindex,n,yy;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backgroundImg: ['cloud://text-aczvw.7465-text-aczvw-1300309057/peoplePositionSample/1.jpg','cloud://text-aczvw.7465-text-aczvw-1300309057/peoplePositionSample/2.jpg','cloud://text-aczvw.7465-text-aczvw-1300309057/peoplePositionSample/3.jpg','cloud://text-aczvw.7465-text-aczvw-1300309057/peoplePositionSample/4.jpg','cloud://text-aczvw.7465-text-aczvw-1300309057/peoplePositionSample/5.jpg',],
    studentNumber: '',
    uuid: '',
    studentData:'',
    openId: '',
    mainx:0,
    content:[],
    start:{x:0,y:0},
    arr1:[],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(options);
    this.setData({
      studentNumber: options.studentNumber,
      uuid: options.uuid,
      openId: options.openId
    })
    let self = this;
    
    wx.request({
      url: 'https://www.bupt.site/graduation/admin/getOrder',
      method: "GET",
      data:{
        uuid: this.data.uuid
      },
      success(res){
        if(res.data.success){
          console.log(res.data.data)
          var arrSort=new Array(self.data.studentNumber)
          for(index in res.data.data){
            res.data.data[index].relative_position = parseInt(res.data.data[index].relative_position) + 1
            arrSort[res.data.data[index].relative_position-1] = res.data.data[index]
          }
          self.setData({
            content: arrSort,
            arr1: arrSort
          })
          console.log(self.data.content)
        } else {
          wx.showToast({
            title: '请求列表失败',
            icon: 'loading',
            duration: 800
          })
        }
        
      }
    })
  },
  // 修改列表响应
  BtnToEdit: function() {
    // 创建数据数组
    var openIdArr = Array(this.data.studentNumber)
    for(index in this.data.content){
      openIdArr[index] = this.data.content[index].user_open_id
    }
    // 检验输出
    console.log(openIdArr)
    console.log(this.data.uuid)
    // 请求逻辑
    wx.request({
      url: 'https://www.bupt.site/graduation/admin/changePeopleOrder',
      method: "GET",
      data: {
        uuid: this.data.uuid,
        openId: openIdArr
      },
      success(res){
        console.log(res)
        if(res.data.success){
          wx.showToast({
            title: '更改成功',
            icon: "success",
            duration: 800
          })
        } else {
          wx.showToast({
            title: '更改失败',
            icon: "loading",
            duration: 800
          })
        }
      }
    })
  },


  movestart:function(e){
    currindex = e.target.dataset.index;
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
      x1 = e.currentTarget.offsetLeft;
      y1 = e.currentTarget.offsetTop;
},
move:function(e){
    yy = e.currentTarget.offsetTop;
    x2 = e.touches[0].clientX-x+x1;
    y2 = e.touches[0].clientY-y+y1;
    this.setData({
      mainx:currindex,
      opacity:0.7,
      start:{x:x2,y:y2}
    })
},
moveend:function(){
    
    if(y2 != 0){
      var arr = [];
      for(var i=0; i<this.data.content.length; i++){
        arr.push(this.data.content[i]);
      }
      var nx = this.data.content.length;
      n=1;
      for(var k=2; k<nx; k++){
        if(y2>(52*(k-1)+k*2-26)){
            n=k;
        }
      }
      if(y2>(52*(nx-1)+nx*2-26)){
        n = nx;
      }
      
      arr.splice((currindex-1),1);
      arr.splice((n-1),0,this.data.arr1[currindex-1]);
      
      this.data.arr1 = [];
      
      for(var m=0; m<this.data.content.length; m++){
        arr[m].relative_position = m+1;
        this.data.arr1.push(arr[m]);
      }
      this.setData({
      mainx:"",
      content:arr,
      opacity:1
      })
    }
    console.log(this.data.content)
},

box: function(){

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

  },
  
})
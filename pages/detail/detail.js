const db = wx.cloud.database();
const _ = db.command
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data:{
    head_image:'',
    name:'',
    from:'',
    to:'',
    ddl:'',
    gender:'',
    price:'',
    description:'',
    time:'',
    image:[],
    id:'',
    oid:'',
    takename:'',
    takephoto:'',
    openid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var str = options.detail;
    var detail = str.split(",");
    this.setData({
      head_image:detail[0],
      name:detail[1],
      from:detail[2],
      to:detail[3],
      times:detail[4],
      dates:detail[5],
      gender:detail[6],
      price:detail[7],
      description:detail[8],
      time:detail[9],
      image:detail[10],
      type: detail[11],
      state: detail[12],
      id: detail[13],
      oid: detail[14]
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

  },

  take: function(){
    var that = this;
    wx.cloud.callFunction({  //得到接单人openid
      
      name:'getOpenid',
      complete:res=>{
        var openid1 = res.result.openid
        that.setData({
          openid: openid1
        })
      }
    }) 
    console.log(this.data.openid)
    if(this.data.takename==''){
      wx.getUserProfile({
        desc:'更新数据',
        success:res=>{
            var photo1=res.userInfo.avatarUrl;
            var name1= res.userInfo.nickName;
            that.setData({
              takephoto:photo1,
              takename:name1
            })
        }
      })
      return;
    }
    if(this.data.takename&&this.data.takephoto){
    var id = this.data.id;
    wx.cloud.callFunction({  //修改订单state
      name:'updateState',
      data:{
          id:id
      }
    }).then(res=>{
        console.log('success')
    }).catch(res=>{
        console.log('failed')
    })
    
    if(this.data.openid){
      wx.cloud.callFunction({  //增加接单人信息
        name:'addMsg',
        data:{
            id:id,
            openid: this.data.openid,
            takename: this.data.takename,
            takephoto: this.data.takephoto
        }
      }).then(res=>{
        wx.showToast({
          title: 'Reserve successfully',
        })
      }).catch(res=>{
        wx.showToast({
          title: 'Reserve failed',
        })
      })
  
    app.globalData.value='2';
    wx.switchTab({
      url: '../order/order',
      success: function (e) {  
        var page = getCurrentPages().pop();  
        if (page == undefined || page == null) return;  
        page.onLoad();  
      }  
    })
  }
  }
  },
  chat: function(){
    wx.navigateTo({
      url: "../chatroom/chatroom"
    })  
    
  }
})
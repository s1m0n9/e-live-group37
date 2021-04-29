// pages/homepage/homepage.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[
      "https://www.xjtlu.edu.cn/zh/assets/image-cache/images/campus/South%20Campus/south-campus021.80bf710a.jpg",
      "http://5b0988e595225.cdn.sohucs.com/images/20190610/e92bb3e60701458ab5cc5b5c00c01b12.jpeg"
    ],
    total_list:[
      // {locate: "WenXin department A05", to: "Rookie station", ddl: "This friday 10:00 am", gender: "girl only", price: "8", description:"Not big, it's urgent!", time:"3 days ago"},
      // {locate: "Rookie station", to: "WenXin department A01", ddl: "Today 19:00 ", gender: "no limitation", price: "10",description:"Not big, it's urgent!", time:"2 days ago"},
      // {locate: "CB", to: "Rookie station", ddl: "Tomorrow at noon", gender: "no limitation", price: "6", description:"Not big, it's urgent!",time:"1 hour ago"},
      // {locate: "WenXin department A05", to: "Rookie station", ddl: "This friday 10:00 am", gender: "girl only", price: "8", description:"Not big, it's urgent!",time:"1 days ago"},
      // {locate: "WenXin department A05", to: "WenCui department", ddl: "This friday 10:00 am", gender: "girl only", price: "12", description:"Not big, it's urgent!",time:"2 days ago"},
      // {},
      // {}
    ],
    expressage_list:[
      {locate: "WenXin department A05", to: "Rookie station", ddl: "This friday 10:00 am", gender: "girl only", price: "8", description:"Not big, it's urgent!",time:"2 days ago"},
      {}
    ],
    night_list:[
      {locate: "Rookie station", to: "WenXin department A01", ddl: "Today 19:00 ", gender: "no limitation", price: "10", description:"Not big, it's urgent!",time:"2 days ago"},
      {locate: "WenCui department", to: "WenXin department A01", ddl: "Today 23:00 ", gender: "no limitation", price: "10", description:"Not big, it's urgent!",time:"2 days ago"},
      {}
    ],
    takeout_list:[
      // {locate: "WenXin department A05", to: "WenXin department A02", ddl: "This friday 10:00 pm", gender: "girl only", price: "8", description:"Not big, it's urgent!",time:"2 days ago"},
      // {}
    ],
    isTabs:1,
    announcementText:"Welcome to the E-live! This is a platform for students in XJTLU, which aims to provide students with convenience in life. Enjoy your experience!",
    types:["Latest order","Pending order","Most bounty","Near expired"],
    type:"Latest order"
  },
  checkTap(e) {
    console.log(e.currentTarget.dataset.flag);
    this.setData({
      isTabs:e.currentTarget.dataset.flag
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    db.collection('PostInfo').get({
      success(res) {
        for (let i=res.data.length-1,j=0; i >= 0;i--,j++) {
          console.log(res.data[j])
          var total_list = "total_list[" + j + "]";
          that.setData({
            [total_list]: res.data[i],
          })
        }
      }
    })
  },
  onReady: function () {
    
   },
   OnRefresh(){
    var that = this;
    // //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading(); 
    // //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '刷新中...',
    })
    console.log ("刷新成功")
    console.log ("刷新成功")
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  
  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === "function" &&
    this.getTabBar()){
      this.getTabBar().setData({
        selected: 0,
        show:true
      })
    }
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
    var that = this;
    db.collection('PostInfo').get({
      success: res => {
        for (let i=res.data.length-1,j=0; i >= 0;i--,j++) {
          console.log(res.data[j])
          var total_list = "total_list[" + j + "]";
          that.setData({
            [total_list]: res.data[i],
          })
        }
      }
    }),
      wx.stopPullDownRefresh({
        success: (res) => {
          wx.showToast({
            title: 'Refresh successfully',
          })
        },
      })
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
  
  //监听页面滚动
  onPageScroll: function (e) {
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  go_to_chat: function (event) {
    var head_image=event.currentTarget.dataset.photo;
    var name=event.currentTarget.dataset.name;
    var from=event.currentTarget.dataset.from;
    var to=event.currentTarget.dataset.to;
    var times=event.currentTarget.dataset.times;
    var dates=event.currentTarget.dataset.dates;
    var gender=event.currentTarget.dataset.gender;
    var money=event.currentTarget.dataset.money;
    var content=event.currentTarget.dataset.content;
    var time=event.currentTarget.dataset.time;
    var image=event.currentTarget.dataset.image;
    var type=event.currentTarget.dataset.type;
    wx.navigateTo({
          url: "../detail/detail?detail="+head_image+","+name+","+from+","+to+","+times+","+dates+","+gender+","+money+","+content+","+time+","+image+","+type
    })  
 },
 bindRegionChange: function (e) {
      console.log('picker', e.detail.value)
      this.setData({
        type: e.detail.value,
      })
  }
})
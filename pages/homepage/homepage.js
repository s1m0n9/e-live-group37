// pages/homepage/homepage.js
const db = wx.cloud.database();
const _ = db.command
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    navList:[
      "https://www.xjtlu.edu.cn/zh/assets/image-cache/images/campus/South%20Campus/south-campus021.80bf710a.jpg",
      "http://5b0988e595225.cdn.sohucs.com/images/20190610/e92bb3e60701458ab5cc5b5c00c01b12.jpeg"
    ],

    total_list:[],
    expressage_list:[],
    night_list:[],
    takeout_list:[],

    isTabs:1,
    announcementText:"Welcome to the E-live! This is a platform for students in XJTLU, which aims to provide students with convenience in life. Enjoy your experience!",
    types:["Latest order","Most bounty","Near expired"],
    picker: 'time',
    filter_type:"Latest order"
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
    app.editTabbar();
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
    wx.showNavigationBarLoading(); 
    // //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: 'Refreshing...',
    })
    console.log ("Refresh successively")
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
    this.onLoad();
    if (typeof this.getTabBar === "function" &&
    this.getTabBar()){
      this.getTabBar().setData({
        selected: 0,
        show:true
      })
    }

    var that = this;
    var picker1=this.data.picker;

//时间和赏金排序
    if(picker1 == 'time' || picker1 == 'money') {
      //total
      db.collection('PostInfo')
      .orderBy(picker1, 'asc')
      .get()
      .then(res => {
      for (let i=res.data.length-1,j=0; i >= 0;i--,j++) {
        console.log(res.data[j])
        var total_list = "total_list[" + j + "]";
        that.setData({
          [total_list]: res.data[i],
        })
      }
    })

      //Expressage
      db.collection('PostInfo')
      .where({
      type: _.eq("Expressage")
      })
      .orderBy(picker1, 'asc')
      .get()
      .then(res => {
      console.log(res.data.length)
      for (let i=res.data.length-1,j=0; i >= 0;i--,j++) {
      console.log(res.data[j])
      var expressage_list = "expressage_list[" + j + "]";
      that.setData({
        [expressage_list]: res.data[i],
      })
    }
  })

      //Purchasing agent
      db.collection('PostInfo')
      .where({
      type: _.eq("Purchasing agent")
      })
      .orderBy(picker1, 'asc')
      .get()
      .then(res => {
      console.log(res.data.length)
      for (let i=res.data.length-1,j=0; i >= 0;i--,j++) {
        console.log(res.data[j])
        var night_list = "night_list[" + j + "]";
        that.setData({
          [night_list]: res.data[i],
        })
      }
       })

    //Take-out
    db.collection('PostInfo')
    .where({
      type: _.eq("Take-out")
    })
    .orderBy(picker1, 'asc')
    .get()
    .then(res => {
      console.log(res.data.length)
      for (let i=res.data.length-1,j=0; i >= 0;i--,j++) {
        console.log(res.data[j])
        var takeout_list = "takeout_list[" + j + "]";
        that.setData({
          [takeout_list]: res.data[i],
        })
      }
    })
    .catch(err => {
      console.error(err)
    })
  }
      
    //按照ddl排序
    if(picker1 == 'dates') {
    //total
    db.collection('PostInfo')
    .orderBy(picker1, 'desc')
    .orderBy('times', 'desc')
    .get()
    .then(res => {
        for (let i=res.data.length-1,j=0; i >= 0;i--,j++) {
          console.log(res.data[j])
          var total_list = "total_list[" + j + "]";
          that.setData({
            [total_list]: res.data[i],
          })
        }
      })

      //Expressage
      db.collection('PostInfo')
      .where({
        type: _.eq("Expressage")
      })
      .orderBy(picker1, 'desc')
      .orderBy('times', 'desc')
      .get()
      .then(res => {
        console.log(res.data.length)
        for (let i=res.data.length-1,j=0; i >= 0;i--,j++) {
          console.log(res.data[j])
          var expressage_list = "expressage_list[" + j + "]";
          that.setData({
            [expressage_list]: res.data[i],
          })
        }
      })

      //Purchasing agent
      db.collection('PostInfo')
      .where({
        type: _.eq("Purchasing agent")
      })
      .orderBy(picker1, 'desc')
      .orderBy('times', 'desc')
      .get()
      .then(res => {
        console.log(res.data.length)
        for (let i=res.data.length-1,j=0; i >= 0;i--,j++) {
          console.log(res.data[j])
          var night_list = "night_list[" + j + "]";
          that.setData({
            [night_list]: res.data[i],
          })
         }
      })

      //Take-out
      db.collection('PostInfo')
      .where({
         type: _.eq("Take-out")
      })
      .orderBy(picker1, 'desc')
      .orderBy('times', 'desc')
      .get()
      .then(res => {
        console.log(res.data.length)
        for (let i=res.data.length-1,j=0; i >= 0;i--,j++) {
          console.log(res.data[j])
          var takeout_list = "takeout_list[" + j + "]";
          that.setData({
            [takeout_list]: res.data[i],
          })
        }
      })
      .catch(err => {
        console.error(err)
      })
   }

   //只显示free
   if(picker1 == 'free') {
    //total
    db.collection('PostInfo')
    .where({
      state: "Free"
    })
    .get()
    .then(res => {
        for (let i=res.data.length-1,j=0; i >= 0;i--,j++) {
          console.log(res.data[j])
          var total_list = "total_list[" + j + "]";
          that.setData({
            [total_list]: res.data[i],
          })
        }
      })

      //Expressage
      db.collection('PostInfo')
      .where({
        type: "Expressage",
        state: "Free"
      })
      .get()
      .then(res => {
        console.log(res.data.length)
        for (let i=res.data.length-1,j=0; i >= 0;i--,j++) {
          console.log(res.data[j])
          var expressage_list = "expressage_list[" + j + "]";
          that.setData({
            [expressage_list]: res.data[i],
          })
        }
      })

      //Purchasing agent
      db.collection('PostInfo')
      .where({
        type: _.eq("Purchasing agent"),
        state: "Free"
      })
      .get()
      .then(res => {
        console.log(res.data.length)
        for (let i=res.data.length-1,j=0; i >= 0;i--,j++) {
          console.log(res.data[j])
          var night_list = "night_list[" + j + "]";
          that.setData({
            [night_list]: res.data[i],
          })
         }
      })

      //Take-out
      db.collection('PostInfo')
      .where({
         type: _.eq("Take-out"),
         state: "Free"
      })
      .get()
      .then(res => {
        console.log(res.data.length)
        for (let i=res.data.length-1,j=0; i >= 0;i--,j++) {
          console.log(res.data[j])
          var takeout_list = "takeout_list[" + j + "]";
          that.setData({
            [takeout_list]: res.data[i],
          })
        }
      })
      .catch(err => {
        console.error(err)
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
    console.log("loading")
    wx.showNavigationBarLoading() //在标题栏中显示加载
    
    //Total
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
    })
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
    var state=event.currentTarget.dataset.state;
    var id=event.currentTarget.dataset.id;
    var oid=event.currentTarget.dataset.oid;
    wx.navigateTo({
          url: "../detail/detail?detail="+head_image+","+name+","+from+","+to+","+times+","+dates+","+gender+","+money+","+content+","+time+","+image+","+type+","+state+","+id+","+oid
    })  
 },
 bindRegionChange: function (e) {
      console.log('picker', e.detail.value)
      if(e.detail.value==1)
          var val='money';
      if(e.detail.value==0)
          var val='time'
      if(e.detail.value == 2) {
        var val = 'dates'
      }
      this.setData({
            picker:val,
      })
      this.onShow();
  }
})
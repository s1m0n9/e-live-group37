const app = getApp()
var util = require('../../utils/util2.js');
const db = wx.cloud.database();//初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    isTabs:'1',
    datetimeTo: "", // 开始时间模拟时间 订单的DDL
    timeLeft: '',    // 剩下的时间
    type: "",   //订单状态 list中尚未添加
    openid: '',
    postlist:[],
    name: '',
    from: '',
    to: '',
    money: '',
    gender: '',
    times: '',
    queryResult1: [],
    queryResult2: [],
    DataList: [],
    DataList2: [],
    takerbal: '',
    takerbalance:'',
    posterbalance:'',
    content:'',
    takename:'',
    time:'',
    DDL:'',
    dates:'',
    taketime:''

   },
   
   onLoad:function(options){
    app.editTabbar();
    this.setData({
      isTabs: app.globalData.value
    })
    var that = this;
    wx.cloud.callFunction({
      name:'getOpenid',
      complete:res=>{
        console.log('openid--',res.result)
        var openid = res.result.openid
        that.setData({
          openid: openid
        })
        this.queryPost()
      }
    }) 
 },
 queryPost: function(){
   let that = this;
     // 查询当前用户所有的 counters
  db.collection('PostInfo').where({
    _openid: this.data.openid
  })
  .get()
  .then(res => { 
    console.log(res.data.length)
    for (let i=res.data.length-1,j=0; i >= 0;i--,j++) {
      console.log(res.data[j])
      var queryResult1 = "queryResult1[" + j + "]";
      that.setData({
        [queryResult1]: res.data[i]
      })
    }
  }),
  db.collection('PostInfo')
  .where({
    takeid: this.data.openid
  })
  .get()
  .then(res => { 
    console.log(res.data.length)
    for (let i=res.data.length-1,j=0; i >= 0;i--,j++) {
      console.log(res.data[j])
      var queryResult2 = "queryResult2[" + j + "]";
      that.setData({
        [queryResult2]: res.data[i],
        datetimeTo: res.data[i].dates+"  "+res.data[i].times+" GMT+0800"
      })
    }
  })
 },
 

   //删除订单
   cancel:function(e){
    var that = this;
    let id = e.currentTarget.id;//get current clicked item id
    //var objectId = that.data.queryResult[id]._id;
    //console.log(objectId)
    wx.showModal({
      title: 'Tip',
      content: 'Delete this order',
      cancelText:'Cancel',
      confirmText:'Confirm',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定删除订单')  
          //在list中删除订单信息 并刷新
          var postId = that.data.queryResult1[id]._id; //according to the querypost to get _id
             console.log(postId)
          //原生删除
          db.collection('PostInfo').doc(postId).remove({
            success(res) {
              console.log(res)
            }
          })
          app.globalData.value='1'

          const pages = getCurrentPages()
          const perpage = pages[pages.length - 1]
          perpage.onLoad()  
          
          wx.showToast({
            title: 'Canceled successfully',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')            //无反应
        }
      }
    })
  },

 
  //确认收货
  confirm: function(e){
    var that = this;
    let id = e.currentTarget.id;//get current clicked item id
    console.log(e.currentTarget.id)
    wx.showModal({
      title: 'Tip',
      content: 'Confirm this order',
      cancelText:'Cancel',
      confirmText:'Confirm',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定完成订单')   
          console.log(that.data.queryResult1[id])
          var postId = that.data.queryResult1[id]._id; //according to the querypost to get _id
             console.log(postId)
          
          db.collection('PostInfo').doc(postId).update({
            data:{
              state:"Finished"
            }
          })

          var takeId = that.data.queryResult1[id].takeid;                                 //修改接单者余额
          var money = that.data.queryResult1[id].money;
        
         
          console.log(takeId);
          console.log(money);
          db.collection('adminlist').where({       //获取taker历史balance
            _openid:takeId
            }) 
            .get()
            .then(res => {  
                that.setData({
                  DataList: res.data,
                })  
                console.log(that.data.DataList)
                var bal=that.data.DataList[0].balance
                that.setData({
                  takerbalance:bal
                })
                console.log(that.data.takerbalance)
                var takerbal=Number(that.data.takerbalance) + Number(money);
                console.log(takerbal)                      //接单者的新余额
                wx.cloud.callFunction({  //增加接单人信息
                  name:'changeBalance',
                  data:{
                      id:takeId,
                      newbalance: takerbal
                  }
                }).then(res=>{
                  wx.showToast({
                    title: '收货 successfully',
                  })
                }).catch(res=>{
                  wx.showToast({
                    title: 'transfer accounts failed',
                  })
                })
            })
            .catch(err => {
              console.error(err)
            })
          

          
          var posterId = that.data.queryResult1[id].
          _openid;                                 //修改发布者余额
         
          console.log(posterId);
          console.log(money);
          db.collection('adminlist').where({       //获取poster历史balance
            _openid:posterId
            }) 
            .get()
            .then(res => {  
                that.setData({
                  DataList2: res.data,
                })  
                console.log(that.data.DataList2)
                var bal2=that.data.DataList2[0].balance
                that.setData({
                  posterbalance:bal2
                })
                console.log(that.data.posterbalance)
                var posterbal=Number(that.data.posterbalance) - Number(money);

                wx.cloud.callFunction({  //增加接单人信息
                  name:'changeBalance',
                  data:{
                      id:posterId,
                      newbalance: posterbal
                  }
                }).then(res=>{
                  wx.showToast({
                    title: '收货 successfully',
                  })
                }).catch(res=>{
                  wx.showToast({
                    title: 'transfer accounts failed',
                  })
                })
            })
            .catch(err => {
              console.error(err)
            })
          
          
        } else if (res.cancel) {
          console.log('用户点击取消')            //无反应
        }
      }
    })
  },
 
  

  //倒计时
  onShow: function () {
    this.onLoad();
    this.data.timer = setInterval(() =>{ //注意箭头函数！！
      this.setData({
        timeLeft: util.getTimeLeft(this.data.datetimeTo)//使用了util.getTimeLeft
      })
        if (this.data.timeLeft == "0天0时0分0秒") {
          clearInterval(this.data.timer);
          return;
        }
    }, 1000);
  },


  checkTap(e) {
    this.setData({
      isTabs:e.currentTarget.dataset.flag
    })
  },
  
  
  onPostTap: function (event) {
    var name = event.currentTarget.dataset.name;
    var state = event.currentTarget.dataset.state;
    var time = event.currentTarget.dataset.time;
    var sp = event.currentTarget.dataset.sp;
    var detail = event.currentTarget.dataset.detail;
    var money = event.currentTarget.dataset.money;
    var pic = event.currentTarget.dataset.pic;
    // console.log("on post id is" + postId);
    wx.navigateTo({
      // url:"post-detail/post-detail"
      url: "../demo2/demo2?onPostTap=" + name +"|"+ state +"|"+ time +"|"+ sp+"|"+detail+"|"+money+"|"+pic
    })
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   app.editTabbar();
  // },
  onPullDownRefresh: function () {
    this.queryPost()
      wx.stopPullDownRefresh({
                success: (res) => {
                  wx.showToast({
                    title: 'Refresh successfully',
                  })
                },
              })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    this.getDeviceInfo()
    this.orderShow()
  },

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

orderShow: function () {
  let that = this
 
  
},


  Toqiyechaxunmsg(e){
    wx.navigateTo({
      url:'../demo2/demo2',
      success:()=>{
        var id = e.currentTarget.dataset.id;
        wx.setNavigationBarTitle({
          title: this.data.companies[id].name
        })
      }
    })
},

  
    /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  go_to_demo: function (event) {
        var name = event.currentTarget.dataset.name;
        var state = event.currentTarget.dataset.state;
        var time = event.currentTarget.dataset.time;
        var sp = event.currentTarget.dataset.sp;
        var detail = event.currentTarget.dataset.detail;
        var money = event.currentTarget.dataset.money;
        var pic = event.currentTarget.dataset.pic;
        var from = event.currentTarget.dataset.from;
        var to = event.currentTarget.dataset.to;
        var type = event.currentTarget.dataset.type;
        var gender = event.currentTarget.dataset.gender;
        var content = event.currentTarget.dataset.content;
        var takename = event.currentTarget.dataset.takename;
        var times = event.currentTarget.dataset.times;
        var dates = event.currentTarget.dataset.dates;
        var taketime = event.currentTarget.dataset.taketime;
        var takeid = event.currentTarget.dataset.takeid;
        // console.log("on post id is" + postId);
        wx.navigateTo({
          // url:"post-detail/post-detail"
          url: "../order/demo2?onPostTap=" + name +"|"+ state +"|"+ time +"|"+ sp+"|"+detail+"|"+money+"|"+pic+"|"+from+"|"+to+"|"+type+"|"+gender+"|"+content+"|"+takename+"|"+times+"|"+dates+"|"+taketime+"|"+takeid
        })
      }

})
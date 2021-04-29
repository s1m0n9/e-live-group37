const app = getApp()
const util = require('../../utils/util.js')
const db = wx.cloud.database();//初始化数据库
let that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTabs:1,
    datetimeTo: "2021/04/30 10:30:00 GMT+0800", // 开始时间模拟时间 订单的DDL
    timeLeft: "",    // 剩下的时间
    type: "",   //订单状态 list中尚未添加
    openid: '',
    postlist:[],
    name: '',
    from: '',
    to: '',
    money: '',
    gender: '',
    times: '',
    queryResult: ''

   },
   
   onLoad(){
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
  .get({
    success: res => {
      that.setData({
        //queryResult: JSON.stringify(res.data, null, 2),
        queryResult: res.data,
        
        //from: JSON.stringify(res.data[0].from, null, 0).replace("\"","").replace("\"",""),

        // to: JSON.stringify(res.data[0].to, null, 0).replace("\"","").replace("\"",""),
        //times: JSON.stringify(res.data[0].times, null, 0).replace("\"","").replace("\"",""),
        // money: JSON.stringify(res.data[0].money, null, 0).replace("\"","").replace("\"",""),
        // gender: JSON.stringify(res.data[0].gender, null, 0).replace("\"","").replace("\"",""),
      })
      console.log('[数据库] [查询记录] 成功: ', res)
      console.log(this.data.queryResult)
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '查询记录失败'
      })
      console.error('[数据库] [查询记录] 失败：', err)
    }
  })
 },

   //删除订单
   cancel(){
    wx.showModal({
      title: 'Tip',
      content: 'Delete this order',
      cancelText:'Cancel',
        confirmText:'Confirm',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定 删除订单')    //在list中删除订单信息 并刷新

        } else if (res.cancel) {
          console.log('用户点击取消')            //无反应
        }
      }
    })
  },


  //确认收货
  confirm(){
    wx.showModal({
      title: 'Tip',
      content: '确认已收货',
      cancelText:'Cancel',
        confirmText:'Confirm',
      success (res) {
        if (res.confirm) {
          console.log('确认收货')    //在list中更改订单信息状态为已结束

        } else if (res.cancel) {
          console.log('用户点击取消')            //无反应
        }
      }
    })
  },

  //倒计时
  onShow: function () {
    this.data.timer = setInterval(() =>{ //注意箭头函数！！
      this.setData({
        timeLeft: util.getTimeLeft(this.data.datetimeTo)//使用了util.getTimeLeft
      });
      if (this.data.timeLeft == "0天0时0分0秒") {
        clearInterval(this.data.timer);
      }
     // console.log(this.data.timeLeft)
    }, 1000);
  },


  checkTap(e) {
    console.log(e.currentTarget.dataset.flag);
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
      // var that = this;
          // db.collection('MessageList').get({
            //   success: res => {
            //     for (let i=res.data.length-1,j=0; i >= 0;i--,j++) {
            //       console.log(res.data[j])
            //       var total_list = "total_list[" + j + "]";
            //       that.setData({
            //         [total_list]: res.data[i],
            //       })
            //     }
            //   }
            // }),
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
    that.alreadyShow()
    that.waitPayShow()
  
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
//模拟数据
  alreadyShow: function(){
    let that= this;
    this.setData({
      alreadyOrder: [{ name: "快递", state: "待付款", time: "2021-03-22，18:00-20:00", sp: "boys only", url: "../../tabbarComponent/icon/1.jpg", money: "186",detail:"在文星菜鸟驿站" },{ name: "外卖", state: "交易成功", time: "2021-03-01，13:00-14:30", sp: "girls only", url: "../../tabbarComponent/icon/2.jpg", money: "132",detail:"私聊" }]
    })
    // console.log ('result', that.data.queryResult)
    // this.setData({
    //   alreadyOrder: this.data.queryResult
    // })
  },

  waitPayShow: function(){
    this.setData({
      waitPayOrder: [{ name: "快递", state: "交易成功", time: "2018-10-12 18:00-20:00", status: "未开始", url: "../../tabbarComponent/icon/2.jpg", money: "205" }],
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
        // console.log("on post id is" + postId);
        wx.navigateTo({
          // url:"post-detail/post-detail"
          url: "../order/demo2?onPostTap=" + name +"|"+ state +"|"+ time +"|"+ sp+"|"+detail+"|"+money+"|"+pic
        })
      }

})
// pages/restMoney/restMoney.js
let app = getApp();
const db = wx.cloud.database();
const admin = db.collection('adminlist');
Page({

  /**
   * 页面的初始数据
   */
 
  data: {
    currentIndex1: true,
    currentIndex2: false,
    DataList: [],
    DataListTransaction: [],
    height:'',
    balance:''
  },
 
  onLoad(){
    
  },
  //点击充值跳转充值页面
  chongzhi:function(){
    wx.navigateTo({
      url: '../transferin/transferin',
    })
  },
  //点击充值跳转提现页面
  tixian:function(){
    wx.navigateTo({
      url: '../transferout/transferout',
    })
  },
  currentIndex1: function (e) {
    this.setData({
      currentIndex1: true,
      currentIndex2: false,
    })
  },
  currentIndex2: function (e) {
    this.setData({
      currentIndex1: false,
      currentIndex2: true,
    })
  },
  onShow: function () {
    if (typeof this.getTabBar === "function" &&
    this.getTabBar()){
      this.getTabBar().setData({
        selected: 0,
        show:true
      })
    }
    var that = this;
    var iInfo=app.globalData.name;
   

    db.collection('adminlist').where({
      name:iInfo
      }) 
      .get()
      .then(res => {  
          that.setData({
            DataList: res.data,
          })  
          console.log(that.data.DataList)
          var bal=that.data.DataList[0].balance
          that.setData({
            balance: bal,
          })  
      })
      .catch(err => {
        console.error(err)
      })

      db.collection('transaction').where({
        name:iInfo
        })   
        .orderBy('data','desc')
        .get() 
        .then(res => { 
            that.setData({
              DataListTransaction: res.data,
            })   
        })
        .catch(err => {
          console.error(err)
        })
        console.log(this.data.DataListTransaction);    

  },

  ontoShow: function(){
    var iInfo=app.globalData.name;
    
  }

 
 

  
})
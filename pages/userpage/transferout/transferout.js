// pages/chongzhi/chongzhi.js
const app = getApp()
const db = wx.cloud.database();//初始化数据库
var util = require('../../../utils/util.js');
Page({
  data: {
  amount:0,
  newbalance:0,
  lastbalance:0,
  time:''

  },
  //获取输入值
  MoneyInput(e) {
    console.log(app.globalData.name) ;
    console.log(e.detail.value)
   this.setData({
      amount: e.detail.value    
    });
    console.log(this.data.amount)
  

    var that = this;
    var iInfo=app.globalData.name;
    db.collection('adminlist').field({
      balance:true,
      _id:false
    })   
      .where({
      name:iInfo
      })     
      .get()
      .then(res => {   
          that.setData({
            lastbalance:res.data[0].balance,              
          })             
          var newb =Number(this.data.lastbalance)-Number(this.data.amount);
          that.setData({
             newbalance: newb
          })
      })
      .catch(err => {
        console.error(err)
      }) 
      
  },


  reset:function(option){    
    var iInfo=app.globalData.name;
    console.log(this.data.newbalance)
    
    wx.cloud.callFunction({  //增加接单人信息
      name:'addBalance',
      data:{
          name:iInfo,
          newbalance: this.data.newbalance
      }
    }).then(res=>{
      var TIME = util.formatTime(new Date());
      this.setData({
        time: TIME,
      })
  
      db.collection('transaction').add({
        data:{
          transactionamount:'-'+'¥'+this.data.amount ,
          name:app.globalData.name,
          data:this.data.time
        }
        }).then(res=>{
            wx.showToast({
              title: 'transfer accounts successfully',
            })
            
            wx.navigateBack({
            })

      }).catch(res=>{
        wx.showToast({
          title: 'transfer accounts failed',
        })
      })

    }).catch(res=>{
      wx.showToast({
        title: 'transfer accounts failed',
      })
    })

    
  }  

})
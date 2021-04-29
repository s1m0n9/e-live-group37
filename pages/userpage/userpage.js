// pages/mine/mine.js
const app=getApp();
Page({
  data: {

  },
  
  //个人中心的实名认证,点击跳转到实名认证
  realName() {
    
  },
  //个人中心的我的余额,点击跳转到我的余额
  restMoney() {
    wx.navigateTo({
      url: '../userpage/balance/balance',
    })
  },
  //个人中心的意见反馈,点击跳转到意见反馈
  view() {
    wx.navigateTo({
      url: '../userpage/feedback/index',
    })
  },
  //我的地址
  addr(){
    wx.navigateTo({
      url: '../userpage/address/address',
    })
  },
  //退出登录
  signOut(){
    wx.navigateTo({
      url: '../userpage/log/log',
    })
  }
})
// pages/mine/mine.js
const app=getApp();
Page({
  data: {
    tabbar: {},
  },
  handleContact (e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
  },
  onLoad(){
    app.editTabbar();
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
  
  //我的地址
  addr(){
    wx.navigateTo({
      url: '../userpage/address/address',
    })
  },
  //share
  share(){
    wx.navigateTo({
      url: '../userpage/share/share',
    })
  },
  //退出登录
  signOut(){
    wx.navigateTo({
      url: '../login/login',
    })
  }
})
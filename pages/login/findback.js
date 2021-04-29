// pages/findback/findback.js
var app = getApp();
Page({
  data: {
    userid_focus: false,
    passwd_focus: false,
    userid: '',
    passwd: '',
    disable:true,
    opacity: .4,
  },
  useridInput: function (e) {
    if (e.detail.value.length > 0) {
      app.globalData.useridLength = true
    } else {
      app.globalData.useridLength = false
    } 
    this.setData({
      userid: e.detail.value,
      disable: !(app.globalData.useridLength & app.globalData.passwdLength),
      opacity: !(app.globalData.useridLength & app.globalData.passwdLength) == true ? 0.4 : 0.9
    });
  },
  passwdInput: function (e) {
    if (e.detail.value.length > 0) {
      app.globalData.passwdLength = true
    } else {
      app.globalData.passwdLength = false
    }
    this.setData({
      passwd: e.detail.value,
      disable: !(app.globalData.useridLength & app.globalData.passwdLength),
      opacity: !(app.globalData.useridLength & app.globalData.passwdLength) == true ? 0.4 : 0.9
    });
  },
  inputFocus: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    }
  },
  next : function(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
 
})
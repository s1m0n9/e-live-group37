// pages/login/login.js
let app = getApp();
// 获取云数据库引用
const db = wx.cloud.database();
const admin = db.collection('adminlist');
let name = null;
let password = null;

Page({
  onLoad: function (options) {
wx.showLoading({
  title: 'Loading',
})
setTimeout( res=> {
  wx.hideLoading()
}, 500);
},

  data: {
    userid_focus: false,
    passwd_focus: false,
    name: 'null',
    password: 'null',
    disable:true,
    opacity: .4,
  },

  useridInput: function (e) {
    name = e.detail.value
    if (e.detail.value.length > 0) {
      app.globalData.useridLength = true
    } else {
      app.globalData.useridLength = false
    } 
    this.setData({
      name: e.detail.value,
      disable: !(app.globalData.useridLength & app.globalData.passwdLength),
      opacity: !(app.globalData.useridLength & app.globalData.passwdLength) == true ? 0.4 : 0.9
    });
  },

  passwdInput: function (e) {
    password = e.detail.value
    if (e.detail.value.length > 0) {
      app.globalData.passwdLength = true
    } else {
      app.globalData.passwdLength = false
    }
    this.setData({
      password: e.detail.value,
      disable: !(app.globalData.useridLength & app.globalData.passwdLength),
      opacity: !(app.globalData.useridLength & app.globalData.passwdLength) == true ? 0.4 : 0.9
    });
  },

  inputFocus: function (e) {
    if (e.target.id == 'name') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'password') {
      this.setData({
        'passwd_focus': true
      });
    }
  },

  inputBlur: function (e) {
    if (e.target.id == 'name') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'password') {
      this.setData({
        'passwd_focus': false
      });
    }
  },

  register: function(){
    wx.navigateTo({
      url: '/pages/login/register',
    })
  },

  forget : function(){
    wx.navigateTo({
      url: '/pages/login/resetPasswd1',
    })
  },
  login: function(){
    wx.switchTab({
      url: '/pages/homepage/homepage',
    })
  },
  

  //登陆
   login() {
    let that = this;
    //登陆获取用户信息
    admin.get({
      success: (res) => {
        let user = res.data;
        console.log(res.data);
        for (let i = 0; i < user.length; i++) {  //遍历数据库对象集合
           if (name == user[i].name) { //用户名存在
            console.log('name')
            
            
             if (password == user[i].password)
                  {
                    wx.switchTab({
                      url: '/pages/homepage/homepage',
                     })
                    wx.showToast({
                        title: 'Log in successfully!！',
                        icon: 'success',
                        duration: 2500,
                 
                      })
                         
                           
                    break
             
              }
              else (password !== user[i].password) 
              {  
                wx.showToast({
                  title: 'Wrong password',
                  icon: 'error',
                  duration: 2500
                }) 
                break
              }
            }
          else (name != user[i].name) 
          {//不存在
            wx.showToast({
              title: 'Invalid name',
              icon: 'error',
              duration: 2500
            })
          }   
        }
      }
    })
  }
});
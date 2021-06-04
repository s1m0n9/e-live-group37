// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    wx.cloud.init({
      env: 'cloud1-1gik3vhz914086f5',
      traceUser: true
    })
  },
  onShow: function () {
    //隐藏系统tabbar
    //wx.hideTabBar();
  },
  getSystemInfo: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.systemInfo = res;
      }
    });
  },
  editTabbar: function () {
    var tabbar = this.globalData.tabBar;
    var currentPages = getCurrentPages();
    var that = currentPages[currentPages.length - 1];
    var pagePath = that.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (var i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    that.setData({
      tabbar: tabbar
    });
  },
  globalData: {
    //systemInfo: null,//客户端设备信息
    name: null,
    value: '1',
    tabBar: {
      "custom": true,
      "backgroundColor": "#ffffff",
      "color": "#979795",
      "selectedColor": "#1c1c1b",
      "list": [{
        "pagePath": "/pages/homepage/homepage",
        "text": "home",
        "iconPath": "icon/icon_home.png",
        "selectedIconPath": "icon/icon_home_HL.png"
      },
      {
        "pagePath": "/pages/msg/msg",
        "text": "message",
        "iconPath": "icon/sx.png",
        "selectedIconPath": "icon/sx_HL2.png"  
      },
      {
        "pagePath": "/pages/post/post",
        "text": "post",
        "iconPath": "icon/icon_release.png",
        "isSpecial": true,
        "selectedIconPath": "icon/icon_release.png"
      },
      {
        "pagePath": "/pages/order/order",
        "text": "order",
        "iconPath": "icon/icon_SJ.png",
        "selectedIconPath": "icon/icon_SJ_HL.png" 
      },
      {
        "pagePath": "/pages/userpage/userpage",
        "text": "mine",
        "iconPath": "icon/icon_mine.png",
        "selectedIconPath": "icon/icon_mine_HL.png"
      }]
    }
  },
})
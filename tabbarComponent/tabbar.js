// tabBarComponent/tabBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
 
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

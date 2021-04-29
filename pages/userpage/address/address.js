// pages/myAddr/myAddr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrList:[
      {id:1,tel:13636363636,name:"海绵宝宝",addr:"文星A05",index:1},
      { id: 2, tel: 13636363636, name: "派大星", addr: "文星A01", index: 2,checked:true },
    ],
  
  },
  onLoad(){
    var that = this;
    var screenHeight, heights
    wx.getSystemInfo({
      success: function (res) {
        screenHeight = res.screenHeight
        // console.log(res.screenHeight)
      }
    });
    //创建节点选择器
    var query = wx.createSelectorQuery();
    query.select('.main').boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为xxxx的元素的信息 的数组
      // console.log(res);
      //取高度
      heights = res[0].height;
      if (screenHeight - heights <= 124) {
        that.setData({
          display: '',
          height:"188rpx"
        })
      } else {
        that.setData({
          display: 'fixed',
          height: "88rpx"
        })
      }
    })
  },
  //默认地址切换
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  //跳转到添加地址栏
  addAddr(){
    wx.navigateTo({
      url: './addaddress/addaddress',
    })
  },
  //编辑地址
  editAddr(){
    wx.navigateTo({
      url: './editaddress/editaddress',
    })
  }
})
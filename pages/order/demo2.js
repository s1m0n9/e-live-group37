// pages/demo2/demo2.js
//var postsData = require('../../pages/money/detail.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    state:'',
    time:'',
    sp:'',
    detail:'',
    money:'',
    pic:''

},

bindReply: function (e) {
    this.setData({
      releaseFocus: true
    })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var str = option.onPostTap;
    var onPostTap = str.split("|");
    this.setData({
      name:onPostTap[0],
      state:onPostTap[1],
      time:onPostTap[2],
      sp:onPostTap[3],
      detail:onPostTap[4],
      money:onPostTap[5],
      pic:onPostTap[6]
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  
  onShareAppMessage: function () {

  }

})
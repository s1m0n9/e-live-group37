// pages/msg/msg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chat_list:[
      {head_image: "https://www.xjtlu.edu.cn/zh/assets/image-cache/images/campus/South%20Campus/south-campus021.80bf710a.jpg", name: "Rookie", text:"hello world!", time:"23:00"},
      {head_image: "http://5b0988e595225.cdn.sohucs.com/images/20190610/e92bb3e60701458ab5cc5b5c00c01b12.jpeg", name: "HJS", text:"I am handsome enough", time:"10:30"},
      {head_image: "https://pic1.zhimg.com/v2-624e9e4fadc7be5f270c3ce1f78f55b1_b.jpg", name: "WMN", text:"I am pig", time:"00:30"}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // var that = this;
        // db.collection('MessageList').get({
          //   success: res => {
          //     for (let i=res.data.length-1,j=0; i >= 0;i--,j++) {
          //       console.log(res.data[j])
          //       var total_list = "total_list[" + j + "]";
          //       that.setData({
          //         [total_list]: res.data[i],
          //       })
          //     }
          //   }
          // }),
    wx.stopPullDownRefresh({
              success: (res) => {
                wx.showToast({
                  title: 'Refresh successfully',
                })
              },
            })
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

  },
  go_to_chat: function (e) {
    var headimage=e.currentTarget.dataset.head_image;
    var name=e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../chat/chat?headimage='+headimage+'&name='+name,
    })  
 }
})
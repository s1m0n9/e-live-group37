Page({

  data: {
    inputLen: 6,
    iptValue: "",
    isFocus: false,
   

  },
  onFocus: function (e) {
    var that = this;
    that.setData({ isFocus: true });
  },
  setValue: function (e) {
    var that = this;
    that.setData({ iptValue: e.detail.value });
  },
  next : function(){
    wx.navigateTo({
      url: '/pages/login/resetPasswd1',
    })
  },
  





})

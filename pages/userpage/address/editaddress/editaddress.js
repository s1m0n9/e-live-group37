// pages/editAddr/editAddr.js
Page({
  data: {
    //省市区
    region: ['浙江省', '杭州市', '拱墅区'],
    
  },
  onLoad: function (options) {
   
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
    })
  }
})
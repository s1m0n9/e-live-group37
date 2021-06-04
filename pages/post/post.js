// pages/post/post.js
const app = getApp()
const db = wx.cloud.database();//初始化数据库
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    imgbox: [],//选择图片
    fileIDs: [],//上传云存储后的返回值
    array:['The boy only','The girl only','No limited'],
    array1:['Expressage','Purchasing agent', 'Take-out'],
    choseQuestionBank1:"Click on the select",
    inputValue: null,
    photo:'',
    name:'',
    dates:'Delivery Date',
    times:'Delivery Time',
    gender:"No limited"
  },

  bindPickerChange1: function (e) {
    var that=this
    that.setData({
      gender: that.data.array[e.currentTarget.dataset.flag]
    })
  },
  // 删除照片 &&
  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },
  // 选择图片 &&&
  addPic1: function (e) {
    var imgbox = this.data.imgbox;
    console.log(imgbox)
    var that = this;
    var n = 5;
    if (5 > imgbox.length > 0) {
      n = 5 - imgbox.length;
    } else if (imgbox.length == 5) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认9，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (5 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);
        }
        that.setData({
          imgbox: imgbox
        });
      }
      
    })
    for(let i=0;i<imgbox.length-1;i++){
      wx.getFileSystemManager().readFile({
      filePath : imgbox[i],
      encoding:'base64'
   })}
    
  },

  //图片
  imgbox: function (e) {
    var that= this;
    that.setData({
      imgbox: e.detail.value
    })
  },

  //发布按钮
  fb: function (e) {
    if (!this.data.imgbox.length) {
      wx.showToast({
        icon: 'none',
        title: '图片类容为空'
      });
    } else {
        //上传图片到云存储                        
        wx.showLoading({
          title: '上传中',
        })
        let promiseArr = [];
        for (let i = 0; i < this.data.imgbox.length; i++) {
          promiseArr.push(new Promise((reslove, reject) => {
            let item = this.data.imgbox[i];
            let suffix = /\.\w+$/.exec(item)[0];//正则表达式返回文件的扩展名
            wx.cloud.uploadFile({
              cloudPath: new Date().getTime() + suffix, // 上传至云端的路径
              filePath: item, // 小程序临时文件路径
              success: res => {
                this.setData({
                  fileIDs: this.data.fileIDs.concat(res.fileID)
                });
                console.log(res.fileID)//输出上传后图片的返回地址
                reslove();
                wx.hideLoading();
                wx.showToast({
                  title: "上传成功",
                })
              },
              fail: res=>{
                wx.hideLoading();
                wx.showToast({
                  title: "上传失败",
                })
              }

            })
          }));
        }
        Promise.all(promiseArr).then(res => {//等数组都做完后做then方法
          console.log("图片上传完成后再执行")
          this.setData({
            imgbox:[]
          })
        })

      }
  },

  //post发布数据库
  onLoad: function (options) {
    app.editTabbar();
    var TIME = util.formatTime(new Date());
    this.setData({
      time: TIME,
    });
    
  },

  FromInput: function (e) {
    var that= this;
   that.setData({
      from: e.detail.value
    });
  },
  ToInput: function (e) {
    var that= this;
   that.setData({
      to: e.detail.value
    });
  },
     //  点击时间组件确定事件 
    bindTimeChange: function (e) {
      console.log(e.detail.value)
      this.setData({
        times: e.detail.value
      })
    },
        //  点击日期组件确定事件  
    bindDateChange: function (e) {
      console.log(e.detail.value)
      this.setData({
        dates: e.detail.value
      })
    },
  MoneyInput: function (e) {
    var that= this;
   that.setData({
      money: parseInt(e.detail.value) 
    });
  },
  ContentInput: function (e) {
    var that= this;
   that.setData({
      content: e.detail.value
    });
  },
  to_submit:function(e) {
    if(this.data.name==''){
    wx.getUserProfile({
      desc:'更新数据',
      success:res=>{
          console.log(res)
          console.log(res.userInfo.avatarUrl)
          console.log(res.userInfo.nickName)
          var photo1=res.userInfo.avatarUrl;
          var name1= res.userInfo.nickName;
          this.setData({
            photo:photo1,
            name:name1
          })
      }
    })
  }
    if(this.data.name=='')
      return;
    if (this.data.from && this.data.to && this.data.dates&&this.data.times
      && this.data.money && this.data.gender) {  //content不为空的时候
       
      db.collection('PostInfo').add({
        data: {
          name: this.data.name,//获得用户名
          time: this.data.time,//获得时间
          photo: this.data.photo, //得用户头像
          from: this.data.from, //获得from
          to: this.data.to, //获得to
          times: this.data.times, //获得ddl
          dates: this.data.dates, //获得ddl
          money: this.data.money, //获得money
          gender: this.data.gender,
          content: this.data.content,//获得content
          image: this.data.imgbox, //获得图片
          state: 'Free',
          type: this.data.type,
          DDL: this.data.dates+' '+this.data.times+' GMT+0800'
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          this.setData({
            'inputValue': ''
          })
          wx.showToast({
            title: 'Success',
          })	//成功将评论数据写入小程序云开发数据库
          
        },
        
        fail: err => { //未成功写入数据库
          wx.showToast({
            icon: 'none',
            title: 'Check the Internet'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
      wx.switchTab({
        url: '../homepage/homepage',
        success() {
          var page = getCurrentPages().pop(); 
          page.onLoad(); 
          page.onPullDownRefresh();
        }
      })
      
    }
    else {// from or to or ddl or money为0，输入框未输入数据
      wx.showModal({
        title: 'Reminder',
        content: 'Necessary information cannot be empty',
        showCancel: false,
        confirmText: 'I know',
      })
    }
  },
  checkTap(e) {
    var that=this
    that.setData({
      type: that.data.array1[parseInt(e.currentTarget.dataset.flag)]
    })
  },
  cancel(){
    wx.switchTab({
      url: "../homepage/homepage"
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
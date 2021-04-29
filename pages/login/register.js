let app = getApp();
//获取云数据库引用
const db = wx.cloud.database();
const admin = db.collection('adminlist');
let name = null;
let password = null;
let password2 = null;
let studentID = null;
let phoneNum = null;
let email = null;
Page({
  data: {
   
  },
  //输入用户名
  inputName: function (event) {
    name = event.detail.value
  },
  //输入密码
  inputPassword(event) {
    password = event.detail.value
  },
  inputStudentID(event) {
    studentID = event.detail.value
  },
  inputPhoneNum(event) {
    phoneNum = event.detail.value
  },
  inputEmail(event) {
    email = event.detail.value
  },
  confirmPassword(event){
    password2 = event.detail.value
  },
  //注册
  register() {
    let that = this;
    let flag = false  //是否存在 true为存在
    //查询用户是否已经注册
    admin.get({
      success: (res) => {
        let admins = res.data;  //获取到的对象数组数据
         console.log(admins);
         if (password2 !== password){
          wx.showToast({
            title: '密码不一致！',
            icon: 'success',
            duration: 2500
          })
        } else {
          for (let i = 0; i < admins.length; i++) {  //遍历数据库对象集合
            if (name === admins[i].name) { //用户名存在
              flag = true;
                break;
            }
          }
          if (flag === true) {    //已注册
            wx.showToast({
              title: '账号已注册！',
              icon: 'success',
              duration: 2500
            })
          } else {  //未注册
            that.saveuserinfo()
          }
        }
      }
    })
  },


  //注册用户信息
  saveuserinfo() {
    let that = this;
    admin.add({  //添加数据
      data: {
        phoneNum:phoneNum,
        studentID:studentID,
        name: name,
        password: password,
        email: email
      }
    }).then(res => {
      console.log('注册成功！')
      wx.showToast({
        title: '注册成功！',
        icon: 'success',
        duration: 3000
      })
      wx.redirectTo({
        url: '/pages/login/login',
      })
    })
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
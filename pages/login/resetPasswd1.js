const app=getApp();
const db = wx.cloud.database();
const admin = db.collection('adminlist');
// pages/password/password.js
Page({
  data: {
  
  },
  formSubmit:function(e){
    //console.log(option.itemid);
    var id=e.detail.value.id;
    var oldpwd=e.detail.value.oldpwd;
    var newpwd = e.detail.value.newpwd;
    var newpwd2 = e.detail.value.newpwd2;
    var no = wx.getStorageSync('student').no;
    // console.log(no);
    if(oldpwd=='' || newpwd=='' || newpwd2==''){
      wx.showToast({
        title: 'Invalid',
        icon:'none',
        duration:1000
      })
    }else if(newpwd!=newpwd2){
      wx.showToast({
        title: 'Inconformity',
        icon: 'none',
        duration: 1000
      })
    }else{
      admin.where({"studentID":id}).update({  //添加数据
        data: {
          password: newpwd2,
        }}).then(res => {
          console.log('success！')
           wx.redirectTo({
            url: '/pages/login/login',
          })    
          wx.showToast({
            title: 'success！',
            icon: 'success',
            duration: 3000
          })       
        }
       )

    }
    
    }
})

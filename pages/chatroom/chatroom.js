const app = getApp()

const db = wx.cloud.database()
const chatCollection = db.collection("Chat")
var keyHeight = 0;
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;


Page({
	
	data: {
		userInfo:null,
		textInputValue: '',
		chats:[],
		openId: '',
		NAME:'',
		
		
	},

	
	onLoad: function (options) {
wx.getSetting({
	success: res =>{
		if (res.authSetting['scope.userInfo']){
			wx.getUserInfo({
				success: res=>{
					this.setData({
						userInfo:res.userInfo,
						NAME:app.globalData.name
					})
				}
			})
		}
	}
})
	},
	

		

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	 async onReady () {
		chatCollection.watch({
			onChange: this.onChange.bind(this),
			onError(err){
				console.error(err)
			}
		})
		const {result} = await wx.cloud.callFunction({
			name:'talk'
		})
	
	},
onChange(snapshot){
console.log(snapshot)
if(snapshot.type === 'init'){
	this.setData({
		chat:[
			...this.data.chats,
			...[...snapshot.docs].sort((x,y) =>x.sendTimeTS - y.sendTimeTS)
		],
	})
}else{
	const chats =[...this.data.chats]
	for (const docChange of snapshot.docChanges){
		switch (docChange.queueType){
			case 'enqueue':
				chats.push(docChange.doc)
				break
		}
	}
	this.setData({
		chats: chats.sort((x,y) =>x.sendTimeTS - y.sendTimeTS)
	})
}
	},
	onGetUserInfo(e){
		if (e.detail.userInfo){
			this.setData({
				userInfo:e.detail.userInfo
			})
		}
	},
	
	onTextInput(e){
		this.setData({
			textInputValue:e.detail.value
		})
	}, 
	focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (chats.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },
	onSend() {
		if (!this.data.textInputValue){
return
		}
		const doc = {
			avatar: this.data.userInfo.avatarUrl,
			nickName:this.data.userInfo.nickName,
			msgText:'text',
			Name:app.globalData.name,
			textContent:this.data.textInputValue,
			sendTime: new Date(),
			sendTimeTS: Date.now(),

		}
		chatCollection.add({
			data: doc,
		})
		this.setData({
			textInputValue: '', 
		})
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

	},

	
	/**
	 * 生命周期函数--监听页面加载
	 */
})
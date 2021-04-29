const app = getApp()

const db = wx.cloud.database()
const chatCollection = db.collection("Chat")

Page({
	
	data: {
		userInfo:null,
		textInputValue: '',
		chats:[],
		openId: '',
	},

	
	onLoad: function (options) {
wx.getSetting({
	success: res =>{
		if (res.authSetting['scope.userInfo']){
			wx.getUserInfo({
				success: res=>{
					this.setData({
						userInfo:res.userInfo
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
		this.setData({
			openId:result.openid
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

	onSend() {
		if (!this.data.textInputValue){
return
		}
		const doc = {
			avatar: this.data.userInfo.avatarUrl,
			nickName:this.data.userInfo.nickName,
			msgText:'text',
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
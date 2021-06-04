// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init( {
  env: 'cloud1-1gik3vhz914086f5'
})

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection('adminlist')
  .where({
    _openid: event.id
  })
  .update({
    data: {
      balance: event.newbalance
    }
  })
}
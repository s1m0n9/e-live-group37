// 公共BaseModel
const cloud = require('wx-server-sdk');
cloud.init({
  // 自身环境
  env: 'cloud1-2g7xsoem62b6a2c9',
  traceUser: true,
});
const db = cloud.database();


/**
 * 查询处理 
 * @param  {object} model       集合名称
 * @param  {String} id          查询id
 * @return  {object|null}       查找结果
 */
const findById = (model, fields = {} , id ) => {
  try {
    return db.collection(model)
      .doc(id)   //获取一个记录的数据，当我们有一个id为id的在集合user上的记录，则我们可以通过该记录调用get方法获取相关数据
      .field(fields)   //.field可以用来查找集合里字段的内容，var that = this 不能缺，赋值可以按照上面的代码来赋值
      .get()    //查询操作
  } catch (e) {
    console.error(e)
  }
}


/**
 * 查询处理 带多条件的
 * @param  {object} model         集合名称
 * @param  {Object} [options={}]    查询条件
 * @param  {Number} [page]        开始记录数
 * @param  {Number} [size]        每页显示的记录数
 * @return  {object|null}         查找结果
 */
const query = (model, fields = {}, options = {}, page = 0, size = 10, order = { name: '_id', orderBy:'asc'} ) => {
  try {
    return db.collection(model)
    .where(options)  //一次性添加多个查询条件
    .field(fields) 
    .skip(page)   //分页
    .limit(size)  //返回page条接下来的size条数据
    .orderBy(order.name, order.orderBy)
    .get()

  } catch (e) {
    console.error(e)
  }
}

/**
 * 新增处理
 * @param  {object} model  集合名称
 * @param  {object} params 参数
 * @return {object| null}  操作结果
 */
const add = (model, params) => {
  try {
    return db.collection(model).add({
      data: params
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * 编辑处理
 * @param  {object} model      集合名称
 * @param  {object} params     参数
 * @return {object|null}       操作结果
 */
const update = (model, params) => {
  try {
    return db.collection(model).doc(params._id)
    .update({
      data: params
    })

  } catch (e) {
    console.error(e);
  }
}

/**
 * 删除结果
 * @param  {object} model      集合名称
 * @param  {String} id         参数
 * @return {object|null}       操作结果
 */
const remove = (model, id) => {
  try {
    return  db.collection(model).doc(id).remove()
  } catch (e) {
    console.error(e)
  }
}


//可以将一些公共的代码抽离成为一个单独的js文件，作为一个模块
module.exports = {
  query,
  findById,
  add,
  update,
  remove

}

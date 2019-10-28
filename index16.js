const Koa = require('koa')
const mongoose = require('mongoose')
const app = new Koa()

/* 数据库 */

// 使用 mongoose 连接 mongodb
mongoose.connect('mongodb://localhost:27017/koa_demo', {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', () => {
  console.log('数据库连接失败')
})

db.on('open', () => {
  console.log('数据库连接成功')

  // 骨架
  const Schema = mongoose.Schema
  const userSchema = new Schema({
    name: {type: String},
    age: {type: Number, default: 0},
    email: {type: String, default: ''},
    time: {type: Date, default: Date.now()}
  })

  // 模型
  const userModeal = db.model('user', userSchema)

  //创建文档
  userModeal.create({
    name: 'leo',
    age: 18,
    email: 'example@gmail.com'
  }, () => {
    console.log('文档创建成功')
  })
})

app.use(async ctx => {
  ctx.body = 'mongodb'
})

app.listen(3000, () => console.log('http server is runing at port 3000'))
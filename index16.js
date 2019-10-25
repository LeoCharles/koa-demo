const Koa = require('koa')
const mongoose = require('mongoose')
const app = new Koa()

/* 数据库 */

// 连接 mongodb
const url = 'mongodb://localhost:27017/koa_demo'
mongoose.connect(url, {useNewUrlParser: true}, (err) => {
  if(err) {
    console.log('数据库连接失败')
  } else {
    console.log('数据库连接成功')
  }
})


app.use(async ctx => {
  
  ctx.body = 'mongodb'
})

app.listen(3000, () => console.log('http server is runing at port 3000'))
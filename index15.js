const Koa = require('koa')
const MongoClient  = require('mongodb').MongoClient
const app = new Koa()

/* 数据库 */

// 连接 mongodb
const url = 'mongodb://localhost:27017/koa_demo'
MongoClient.connect(url, (err, db) => {
  if (err) throw err
  console.log('数据库已连接')
  
  const dbbase = db.db('koa_demo')

  // 创建集合
  dbbase.createCollection('user', (err, res) => {
    if (err) throw err
    console.log('创建集合 user')
  })
})


app.use(async ctx => {
  
  ctx.body = 'mongodb'
})

app.listen(3000, () => console.log('http server is runing at port 3000'))
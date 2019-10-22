const Koa = require('koa')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const app = new Koa()

/* 会话管理 */

//  session 存储在 MySQL
let store = new MysqlSession({
  user: 'root',
  password: '123456',
  database: 'koa_demo',
  host: '127.0.0.1',
  port: 3306
})

// 存放sessionId的cookie配置
let cookie = {
  demain: 'localhost',             // 写 cookie 所在的域名
  path: '/',                       // 写 cookie 所在的路径
  maxAge: 1000*60*60*24,           // cookie 有效时长（24小时）
  expires: new Date('2019-10-20'), // cookie 失效日期
  httpOnly: false,                 // 是否仅通过 HTTP(S) 发送
  overwrite: false                 // 是否允许重写
}

app.use(session({
  key: 'SEESION_ID',
  store: store,
  cookie: cookie
}))

// 使用 session 中间件
app.use(async (ctx) => {
  // 设置 session
  if (ctx.url === '/set') {
    ctx.session = {
      user_id: Math.random().toString(36).substr(2),
      count: 0
    }
    ctx.body = ctx.session
  } else if(ctx.url === '/') {
    // 读取 session 信息
    ctx.session.count  = ctx.session.count + 1
    ctx.body = ctx.session
  } else {
    ctx.body = 'mysql 存储 session'
  }
})

app.listen(3000, () => console.log('http server is runing at port 3000'))
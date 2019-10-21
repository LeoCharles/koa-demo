const Koa = require('koa')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const app = new Koa()

/* 会话管理 */

// cookie
app.use(async (ctx) => {
  if(ctx.url === '/user') {
    // 读取 cookie
    const usercookie = ctx.cookies.get('user')
    
    if (usercookie === undefined) {
      // 写入 cookie
      ctx.cookies.set('user', JSON.stringify({
        id: 1,
        name: 'leo'
      }), {
        demain: 'localhost',             // 写 cookie 所在的域名
        path: '/',                       // 写 cookie 所在的路径
        maxAge: 1000*60*60*24,           // cookie 有效时长（24小时）
        httpOnly: false,                 // 是否仅通过 HTTP(S) 发送
        overwrite: false                 // 是否允许重写
      })
    }
    ctx.body = 'cookie is ok'
  } else {
    if (ctx.cookies.get('user')) {
      // 读取 cookie
      ctx.body = ctx.cookies.get('user')
    } else {
      ctx.body = 'cookie is none'
    }
  }
})

app.listen(3000, () => console.log('http server is runing at port 3000'))
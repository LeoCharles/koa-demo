const Koa = require('koa')
const session = require('./middleware/session') // 自定义 session
const koaSession = require('koa-session')
const app = new Koa()

/* 会话管理 */

// session

// 自定义 session
// app.use(session())

// app.use(async ctx => {
//   if (ctx.path === '/favicon.ico') return

//   // 根据 sid 判断是否已登录
//   if (!ctx.session.sid) {
//     if (ctx.path === '/login') {
//       // 获取请求数据
//       const { username, password } = ctx.query

//       if (username && password) {
//         ctx.session.create(username)
//         ctx.body = `已登录，欢迎 ${ctx.session.user}`
//       } else {
//         ctx.body = '用户名密码为空'
//       }
 
//     } else if (ctx.path === '/logout') {
//       ctx.session.destory()
//       ctx.body = '退出成功'
//     } else {
//       ctx.body = '未登录，请到登录页进行登录'
//     }
//   } else {
//     ctx.body = '已登录'
//   }
// })


// ==========================================

// koa-session
app.keys = ['some secret hurr'] // signed 签名的 key

const CONFIG = {
  key: 'koa:sess', // cookie 的 key，默认 'koa:sess'
  maxAge: 5000, // 过期时间（一般设置为1天，此处为方便测试设置为 5s）
  autoCommit: true, // 自动添加到响应头，默认 true
  overwrite: true, // 是否允许重写，默认 true
  httpOnly: true, // 是否仅通过 HTTP 发送，默认 true
  signed: true,  // 是否签名，默认 true
  rolling: true, // 是否每次响应时刷新 session 的有效期，默认 false
  renew: false, // 是否在 session 快过期时刷新 session 的有效期，默认 true
}

// 使用中间件
app.use(koaSession(CONFIG, app))

app.use(async ctx => {
  const databaseUserName = 'leo' // 模拟从数据库中查询的用户名
  const databaseUserPassWd = '123456' // 模拟从数据库中查询的密码
  // 忽略网站图标请求
  if (ctx.path === '/favicon.ico') return
  
  // 判断是否已登录
  if (!ctx.session.isLogin) {
    ctx.session.isLogin = false

    // 获取请求参数，一般是 POST 请求，这里为方便使用 GET
    const { nickname, passwd } = ctx.query

    // 判断用户名密码是否为空
    if (nickname && passwd) {
      // 判断用户名是否存在
      if (databaseUserName === nickname) {
        // 对比密码
        if (databaseUserPassWd === passwd) {
          ctx.body = '登录成功'
          ctx.session.isLogin = true
        } else {
          ctx.body = '密码错误'
        }
      } else {
        ctx.body = '用户名不存在'
      }
    } else {
      ctx.body = '用户名密码不能为空'
    }
  } else {
    ctx.body = '已登录'
  }
})

app.listen(3000, () => console.log('http server is runing at port 3000'))
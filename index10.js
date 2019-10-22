const Koa = require('koa')
const jwt = require('koa-jwt')
const { JWT_SECRET } = require('./utils/account')
const app = new Koa()

/* 会话管理 */

//  jwt 对验证不通过的路由返回 401 状态码
app.use(async (ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        message: '暂无权限'
      }
    } else {
      throw err
    }
  }) 
})

app.use(jwt({secret: JWT_SECRET}).unless({
  path: [/\/login/, /\/register/]
}))

app.listen(3000, () => console.log('http server is runing at port 3000'))
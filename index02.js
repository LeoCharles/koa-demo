const Koa = require('koa')
const router = new require('koa-router')() // 引入并实例化
const indexRoute = require('./route/index')
const productRoute = require('./route/product')
const userRoute = require('./route/user')
const logger = require('koa-logger')
const app = new Koa()

/* koa-router 实现路由 */

// 挂载所有路由
router.use('/', indexRoute.routes(), indexRoute.allowedMethods())
      .use('/product', productRoute.routes(), productRoute.allowedMethods())
      .use('/user', userRoute.routes(), userRoute.allowedMethods())

// 装载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => console.log('http server is running at port 3000'))
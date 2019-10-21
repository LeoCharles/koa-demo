const Koa = require('koa')
const path = require('path')
// const static = require('./middleware/static') // 自定义中间件
const koaStatic = require('koa-static')
const app = new Koa()

/* 静态资源 */

// 静态资源相对于项目入口文件的路径
const staticPath = './static'

// 使用自定义静态资源加载中间件
// app.use(static(path.join(__dirname, staticPath))

// 使用 koa-static 中间件
app.use(koaStatic(path.join(__dirname, staticPath)))

app.listen(3000, () => console.log('http server is runing at port 3000'))
const Koa = require('koa')
const path = require('path')
const logger = require('koa-logger')
const static = require('koa-static')
const views = require('koa-views')
const bodyParser = require('koa-bodyParser')
const config = require('./config/index')
const app = new Koa()

// 日志
app.use(logger())

// 静态资源加载
app.use(static(path.join(__dirname, './public')))

// 模板渲染引擎
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

// POST 参数解析
app.use(bodyParser({formLimit: '1mb'}))

// 路由
app.use(require('./route/articles').routes())
app.use(require('./route/create').routes())
app.use(require('./route/register').routes())
app.use(require('./route/login').routes())
app.use(require('./route/logout').routes())

app.listen(config.port, () => console.log('http server is running at port 3000'))
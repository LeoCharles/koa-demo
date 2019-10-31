const Koa = require('koa')
const path = require('path')
const logger = require('koa-logger')
const static = require('koa-static')
const views = require('koa-views')
const bodyParser = require('koa-bodyParser')
const session = require('koa-session-minimal')
const MySqlStore = require('koa-mysql-session')
const config = require('./config/index')
const app = new Koa()

// 日志
app.use(logger())

// session 存储在 mysql
const store = new MySqlStore({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
})
app.use(session({
  key: 'USER_SID',
  store: store
}))

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
app.use(require('./route/user').routes())

app.listen(config.port, () => console.log('http server is running at port 3000'))
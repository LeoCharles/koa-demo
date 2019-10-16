const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

// 使用 ctx.body 解析
app.use(bodyParser())

// 用 promise 封装异步读取文件方法
function render(page) {
  return new Promise((resolve, reject) => {
    let viewUrl = `./view/${page}`
    fs.readFile(viewUrl, 'binary', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// 父路由
let router = new Router()
router
  .get('/', async (ctx) => {
    let html = await render('index.html')
    ctx.body = html
  })
  .get('/todo', async (ctx) => {
    let html = await render('todo.html')
    ctx.body = html
  })
  .get('/404', async (ctx) => {
    let html = await render('404.html')
    ctx.body = html
  })
  .get('/login', async (ctx) => {
    let html = await render('login.html')
    ctx.body = html
  })

// 使用路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods())


app.use(async (ctx) => {
  if (ctx.url === '/login' && ctx.method === 'POST') {}
    // 当 POST 请求时，koa-bodyparser 解析 POST 表单里的数据
    let postData = ctx.request.body
    ctx.body = postData
})

// 监听端口
app.listen(8787, () => console.log('http server is runing at port 8787'))

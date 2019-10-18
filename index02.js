const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()

// 父路由
let router = new Router()
router
  .get('/', async (ctx) => {ctx.body = 'home page'})
  .get('/product', async (ctx) => {ctx.body = 'product page'})
  .get('/about', async (ctx) => {ctx.body = 'about page'})
  .get('/user', async (ctx) => {ctx.body = 'user page'})

// 子路由 1
let product = new Router()
product
  .get('/list', async (ctx) => {
      ctx.body = 'product / list'
  })
  .get('/detail', async (ctx) => {
    ctx.body = 'product / detail'
  })

// 子路由 2
let todo = new Router()
todo
  .get('/list', async (ctx) => {
    ctx.body = 'todo / list'
  })
  .get('/detail', async (ctx) => {
    ctx.body = 'todo / detail'
  })

// 装载所有子路由到父级路由
router.use('/todo', todo.routes(), todo.allowedMethods())
router.use('/product', product.routes(), product.allowedMethods())

// 装载路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => console.log('http server is running at port 3000'))
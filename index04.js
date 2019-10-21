const Koa = require('koa')
const route = require('./middleware/route')
const parsePost = require('./utils/parsePost')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

/* 请求数据获取 */

// 自定义路由中间件
app.use(route())

// // get 请求
// app.use(async (ctx) => {
//   let url = ctx.url

//   // 从上下文中直接获取
//   let ctx_query = ctx.query
//   let ctx_querystring = ctx.querystring

//   // 从上下文的 request 对象中获取
//   let request = ctx.request
//   let req_query = request.query
//   let req_querystring = request.querystring

//   ctx.body = {
//     url,
//     ctx_query,
//     ctx_querystring,
//     req_query,
//     req_querystring
//   }
// })

// post 请求
// 使用自定义插件
// app.use(async (ctx) => {if (ctx.url === '/login' && ctx.method === 'POST') {
//     // 使用自定义 POST 参数解析方法
//     let postData = await parsePost(ctx)
//     ctx.body = postData
//   }
// })

// 使用 koa-bodyparser 中间件
app.use(bodyParser())
app.use(async (ctx) => {
  if (ctx.url === '/login' && ctx.method === 'POST') {
    // 当 POST 请求时，koa-bodyparser 解析 POST 表单里的数据
    let postData = ctx.request.body
    ctx.body = postData
  }
})

app.listen(3000, () => console.log('http server is runing at port 3000'))
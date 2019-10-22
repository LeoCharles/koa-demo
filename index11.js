const Koa = require('koa')
const jsonp = require('./middleware/jsonp')
const koaJsonp = require('koa-jsonp')
const app = new Koa()

/* 跨域 */

// // 使用自定义 jsonp 中间件
// app.use(jsonp())


// app.use(async ctx => {
//   if (ctx.url === '/getData') {
//     ctx.jsonp({
//       success: true,
//       data: {
//         text: 'this is a jonp test',
//         time: new Date().getTime()
//       }
//     })
//   }
// })

// 使用 koa-jsonp
app.use(async ctx => {
  if (ctx.url === '/getData') {
    // 直接写 json 
    ctx.body = {name: 'leo'}
  }
})

app.use(koaJsonp())

// 前端需要使用 jsonp 函数请求数据，如 jQ 的 $.jsonp()

app.listen(3000, () => console.log('http server is runing at port 3000'))
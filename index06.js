const Koa = require('koa')
const views = require('koa-views')
const render = require('koa-art-template') // 使用 art-template 模板引擎
const path = require('path')
const app = new Koa()

/* 模板引擎 */

// 使用 koa-views 中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'  // 使用 ejs 模板引擎
}))

app.use(async (ctx) => {
  // 渲染模板，传递数据
  await ctx.render('ejs-test', {
    name: 'leo'
  })
})

// // 使用 art-template 模板引擎
// render(app, {
//   root: path.join(__dirname, './views'),   // views 路径
//   extname: '.html',                        // 模板文件扩展名
//   debug: process.env.NODE_ENV !== 'production'
// })

// app.use(async (ctx) => {
//   await ctx.render('art-test', {
//     name: 'leo'
//   })
// })

// 监听端口
app.listen(3000, () => console.log('http server is runing at port 3000'))
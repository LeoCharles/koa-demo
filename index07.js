const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()
// 模板引擎

// 使用 koa-views 中间件
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'  // 设置模板引擎
}))

app.use(async (ctx) => {
  let title = 'hello koa!'
  // 传递数据，渲染模板
  await ctx.render('index', {title})
})

// 监听端口
app.listen(8787, () => console.log('http server is runing at port 8787'))

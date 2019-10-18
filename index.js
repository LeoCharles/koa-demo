const Koa = require('koa')

// 创建实例
const app = new Koa()

// logger
app.use(async (ctx, next) => {
  // 暂停，进入下一个中间件 x-response-time  ---> 步骤 1
  await next()
  // 再次进入该中间件，从响应头中获取响应时间并打印  ---> 步骤 5
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

// x-response-time
app.use(async (ctx, next) => {
  // 进入中间件，记录开始时间
  const start = Date.now()
  // 暂停，进入下一个中间件 response ---> 步骤 2
  await next()
  // 再次进入该中间件，记录两次进入该中间件的时间，并保存到响应头  ---> 步骤 4
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`)
  // 返回上一个中间件
})

// response
app.use(async ctx => {
  // 进入中间件，返回响应数据
  ctx.body = 'hello koa!'
  // 后面没有 app.use, 返回上一个中间件 ---> 步骤 3
})

app.listen(3000, () => console.log('http server is running at port 3000'))
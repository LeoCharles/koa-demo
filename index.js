const Koa = require('koa')

const app = new Koa()

app.use(async (ctx) => {
  if(ctx.url === '/index') {
    // 写入 cookie
    ctx.cookies.set('koa-demo', 'hello koa', {
      demain: 'localhost',             // 写 cookie 所在的域名
      path: '/',                       // 写 cookie 所在的路径
      maxAge: 1000*60*60*24,           // cookie 有效时长（24小时）
      expires: new Date('2019-10-20'), // cookie 失效日期
      httpOnly: false,                 // 是否仅通过 HTTP(S) 发送
      overwrite: false                 // 是否允许重写
    })
    ctx.body = 'cookie is ok'
  } else {
    if (ctx.cookies.get('koa-demo')) {
      // 读取 cookie
      ctx.body = ctx.cookies.get('koa-demo')
    } else {
      ctx.body = 'cookie is none'
    }
  }
})

app.listen(3000, () => console.log('http server is runing at port 3000'))
const Koa = require('koa')
const fs = require('fs')
const colors = require('colors') // 用来设置 console 颜色
const app = new Koa()

/* 自定义路由 demo */

// 用 promise 封装异步读取文件方法
function render(page) {
  return new Promise((resolve, reject) => {
    let viewUrl = `./views/${page}`
    fs.readFile(viewUrl, 'binary', (err, data) => {
      return err ? reject(err) : resolve(data)
    })
  })
}

// 自定义路由中间件
async function route(ctx) {
  let view = '404.html'

  // 通过 判断 ctx.request.url 来实现路由
  const url = ctx.request.url
  switch(url) {
    case '/':
      view = 'index.html'
      break
    case '/index':
      view = 'index.html'
      break
    case '/todo':
      view = 'todo.html'
      break
    case '/404':
      view = '404.html'
      break
    default:
      ctx.status = 404
      break
  }
  ctx.body = await render(view)
  console.log(`${ctx.method} ${(ctx.status + '').green} - ${ctx.url.red} - ${(ctx.length + ' byte').yellow}`)
}

// 使用 rote 中间件
app.use(route)

app.listen(3000, () => console.log('http server is running at port 3000'))
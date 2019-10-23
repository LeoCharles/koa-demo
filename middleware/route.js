const fs = require('fs')

// 用 promise 封装异步读取文件方法
function render(page) {
  return new Promise((resolve, reject) => {
    let viewUrl = `./views/${page}`
    fs.readFile(viewUrl, 'binary', (err, data) => {
      return err ? reject(err) : resolve(data)
    })
  })
}

module.exports = () => async(ctx, next) => {
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
  await next()
}


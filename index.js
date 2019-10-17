const Koa = require('koa')
const path = require('path')
// const content = require('./utils/content')
// const mimes = require('./utils/mimes')
const static = require('koa-static')

const app = new Koa()

// 静态资源相对于项目入口文件的路径
const staticPath = './static'

// 使用 koa-static 中间件
app.use(static(path.join(__dirname, staticPath)))

app.use(async (ctx) => {
  ctx.body = 'hello world'
})
// 解析资源类型
// function parseMime(url) {
//   let extName = path.extname(url)
//   extName = extName ? extName.slice(1) : 'unknow'
//   return mimes[extName]
// }


// app.use(async (ctx) => {
//   // 静态资源目录在本地的绝对路径
//   const fullStaticPath = path.join(__dirname, staticPath)
  
//   // 获取静态资源内容
//   const _content = await content(ctx, fullStaticPath)

//   // 解析请求类型
//   const _mime = parseMime(ctx.url)

//   // 如果有对应类型，就配置上下文类型
//   if(_mime) {
//     ctx.type = _mime
//   }
//   // 输出静态资源内容
//   if(_mime && _mime.indexOf('image/') > -1) {
//     // 如果是图片，则用 Node 原生 res 输出二进制数据
//     ctx.res.writeHead(200)
//     ctx.res.write(_content, 'binary')
//     ctx.res.end()
//   } else {
//     // 其他则输出文本
//     ctx.body = _content
//   }
// })

app.listen(3000, () => console.log('http server is runing at port 3000'))
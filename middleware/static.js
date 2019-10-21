const getContent = require('../utils/getContent')
const { getMime } = require('../utils/mimes')

// 自定义静态资源中间件
module.exports = (fullStaticPath) => async (ctx, next) => {

  // 获取静态资源内容
  const _content = await getContent(ctx, fullStaticPath)

  // 解析文件类型
  const _mime = getMime(ctx.url)

  // 如果有对应类型，就配置上下文类型
  if(_mime) {
    ctx.type = _mime
  }

  // 输出静态资源内容
  if(_mime && _mime.indexOf('image/') > -1) {
    // 如果是图片，则用 Node 原生 res 输出二进制数据
    ctx.res.writeHead(200)
    ctx.res.write(_content, 'binary')
    ctx.res.end()
  } else {
    // 其他则输出文本
    ctx.body = _content
  }
  await next()
}
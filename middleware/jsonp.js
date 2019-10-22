const jsonp = (resData) => {
  // 获取 jsonp 的 callback
  const callback = this.query.callback || 'callback'

  // jsonp 的 script 字符串
  const jsonpStr = `;${callback}(${JSON.stringify(resData)})`

  // 使用 text/javascript 格式
  this.type = 'text/javascript'

  this.body = jsonpStr
}

// jsonp 中间件
module.exports = () => async (ctx, next) => {
  // 挂载在 ctx 下，this 指向 ctx
  ctx.jsonp = jsonp.bind(ctx)
  await next()
}
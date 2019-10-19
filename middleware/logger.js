const colors = require('colors') // 用于 console 颜色设置

module.exports = () => async (ctx, next) => {
  const start = Date.now()
  await next()
  const end = Date.now()
  console.log(
    `${ctx.method}`.cyan,
    `${ctx.status}`.red,
    `${ctx.url}`.yellow,
    `${end - start}ms`.blue
  )
}
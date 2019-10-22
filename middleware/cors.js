module.exports = () => async (ctx, next) => {
  ctx.header["Access-Control-Allow-Origin"]   = "*";   // host 白名单
  ctx.header["Access-Control-Allow-Headers"]  = "Origin, X-Requested-With, Content-Type, Accept"
  ctx.header["Access-Control-Allow-Methods"]  = "PUT,POST,GET,DELETE,OPTIONS"
  ctx.header["Content-Type"]                  = "application/json;charset=utf-8"
  await next()
}
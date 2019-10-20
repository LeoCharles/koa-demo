const Koa = require('koa')
const logger = require('./middleware/logger')
const route = require('./middleware/route')
const parsePost = require('./middleware/parsePost')
const app = new Koa()

/* 请求数据获取 */

// 日志
app.use(logger())
// 路由
app.use(route())

// get 请求
app.use(async (ctx) => {
  let url = ctx.url

  // 从上下文中直接获取
  let ctx_query = ctx.query
  let ctx_querystring = ctx.querystring

  // 从上下文的 request 对象中获取
  let request = ctx.request
  let req_query = request.query
  let req_querystring = request.querystring

  ctx.body = {
    url,
    ctx_query,
    ctx_querystring,
    req_query,
    req_querystring
  }
})

// post 请求
// app.use(async (ctx) => {
//   if (ctx.url === '/dologin' && ctx.method === 'POST') {
//     console.log('login')
//     // 使用自定义 POST 参数解析中间件
//     let data = await parsePost(ctx)
//     console.log(data)
//     ctx.body = data
//   }
// })

function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postData = ''
      ctx.req.addListener('data', (data) => {
        postData += data
      })
      ctx.req.addListener('end', () => {
        let parseData = parseQueryString(postData)
        resolve(parseData)
      })
    } catch (err) {
      reject(err)
    }
  })
}

// 将 POST 请求参数字符串解析成 JSON
function parseQueryString(queryString) {
  let queryData = {}
  let queryStrList = queryString.split('&')
  for (let [index, queryStr] of queryStrList.entries()) {
    let itemList = queryStr.split('=')
    queryData[itemList[0]] = decodeURIComponent(itemList[1])
  }
  return queryData
}

app.use(async (ctx) => {
  if (ctx.url === '/login' && ctx.method === 'POST') {
    let postData = await parsePostData(ctx)
    ctx.body = postData
  }
})

app.listen(3000, () => console.log('http server is runing at port 3000'))

// 将 POST 请求参数字符串解析成 JSON  'name=leo&age=18' => {name: leo, age: 18}
function parseQueryString(queryString) {
  let queryData = {}
  let queryStrList = queryString.split('&')
  for (let [index, queryStr] of queryStrList.entries()) {
    let itemList = queryStr.split('=')
    queryData[itemList[0]] = decodeURIComponent(itemList[1])
  }
  return queryData
}

// 解析上下文对象里 Node 原生请求的 POST 参数
module.exports = async (ctx) => {
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


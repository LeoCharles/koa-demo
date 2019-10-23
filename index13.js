const Koa = require('koa')
const path =require('path')
const static = require('koa-static')
const uploadFile = require('./utils/uploadFile')
const app = new Koa()

/* 文件上传 */

// 静态资源加载
app.use(static(path.join(__dirname, '/static')))

app.use(async ctx => {
  if(ctx.url === '/upload' && ctx.method === 'POST') {
    ctx.body = await uploadFile(ctx, {
      type: 'image',
      path: path.join(__dirname, '/static') // 放在静态资源目录前端页面才能加载到
    })
  }
})

app.listen(3000, () => console.log('http server is runing at port 3000'))
const Koa = require('koa')
const cors = require('./middleware/cors')
const koaCors = require('koa2-cors')
const app = new Koa()

/* 跨域 */

// 使用自定义 cors 中间件
app.use(cors())

// 使用 koa2-cors
app.use('/api/*', koaCors());

app.listen(3000, () => console.log('http server is runing at port 3000'))
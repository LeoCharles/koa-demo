const Router = require('koa-router')

const router = new Router()

router
  .get('/', async (ctx) => {ctx.body = 'home page'})
  .get('/product', async (ctx) => {ctx.body = 'product page'})
  .get('/about', async (ctx) => {ctx.body = 'about page'})
  .get('/user', async (ctx) => {ctx.body = 'user page'})

module.exports = router
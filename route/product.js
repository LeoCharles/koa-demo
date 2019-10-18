const Router = require('koa-router')

const router = new Router()

router
  .get('/', async (ctx) => {
    ctx.body = 'product index page'
  })
  .get('/detail', async (ctx) => {
    ctx.body = 'product detail page'
  })

module.exports = router
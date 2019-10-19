const router = new require('koa-router')()

router
  .get('/', async (ctx) => {ctx.body = 'user index page'})
  .get('/login', async (ctx) => {ctx.body = 'user login page'})

module.exports = router
const router = new require('koa-router')()

router
  .get('/', async (ctx) => {ctx.body = 'product index page'})
  .get('/:id', async (ctx) => {
    // 获取动态路由参数
    const id = ctx.params.id
    ctx.body = `product ${id} detail page`
  })

module.exports = router
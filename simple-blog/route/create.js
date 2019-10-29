const router = require('koa-router')()

// 发表文章
router.get('/create', async (ctx, next) => {
  await ctx.render('create')
})

module.exports = router
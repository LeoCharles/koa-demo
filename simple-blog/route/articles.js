const router = require('koa-router')()

// 文章
router.get('/articles', async (ctx, next) => {
  await ctx.render('articles')
})

// 文章详情
router.get('/articles/:id', async (ctx, next) => {
  await ctx.render('detail')
})

// 发表文章
router.get('/create', async (ctx, next) => {
  await ctx.render('create')
})

module.exports = router
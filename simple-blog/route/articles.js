const router = require('koa-router')()

// 文章
router.get('/articles', async (ctx, next) => {
  await ctx.render('articles')
})

// 文章详情
router.get('/articles/:id', async (ctx, next) => {
  console.log('detail')
  await ctx.render('detail')
})

module.exports = router
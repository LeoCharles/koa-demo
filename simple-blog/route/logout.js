const router = require('koa-router')()

// 
router.get('/logout', async (ctx, next) => {
  await ctx.render('articles')
})

module.exports = router
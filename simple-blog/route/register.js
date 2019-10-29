const router = require('koa-router')()

// 注册页面
router.get('/register', async (ctx, next) => {
  await ctx.render('register')
})

// POST 提交注册表单
router.post('/resiter')

module.exports = router
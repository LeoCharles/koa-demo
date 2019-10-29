const router = require('koa-router')()

// 注册页面
router.get('/login', async (ctx, next) => {
  await ctx.render('login')
})

// POST 提交登录表单
router.post('/login')

module.exports = router
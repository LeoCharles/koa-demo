const router = require('koa-router')()

// 重定向
router.get('/', async ctx => {
  ctx.redirect('/articles/all')
})
router.get('/articles', async ctx => {
  ctx.redirect('/articles/all')
})

// 渲染全部文章页
router.get('/articles/all', async ctx => {
  await ctx.render('articles', {
    type: 'all',
    session: ctx.session
  })
})

// 渲染我的文章页
router.get('/articles/self', async ctx => {
  await ctx.render('articles', {
    type: 'self',
    session: ctx.session
  })
})

// 渲染文章详情页
router.get('/articles/:id', async ctx => {
  await ctx.render('detail', {
    session: ctx.session
  })
})

// 渲染文章发表页
router.get('/articles/create', async ctx => {
  await ctx.render('create', {
    session: ctx.session
  })
})

module.exports = router
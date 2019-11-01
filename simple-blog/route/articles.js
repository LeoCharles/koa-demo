const router = require('koa-router')()
const controller = require('../controller/articles')

// 重定向
router.get('/', async ctx => {
  ctx.redirect('/articles/all')
})
router.get('/articles', async ctx => {
  ctx.redirect('/articles/all')
})

// 渲染文章发表页
router.get('/articles/create', controller.getArticlesCreate)

// 提交文章表单
router.post('/articles/create', controller.postArticlesCreate)

// 渲染全部文章页
router.get('/articles/all', controller.getArticles)

// 渲染我的文章页
router.get('/articles/self', controller.getArticles)

// 渲染文章详情页
router.get('/articles/:id', async ctx => {
  await ctx.render('detail', {
    session: ctx.session
  })
})

module.exports = router
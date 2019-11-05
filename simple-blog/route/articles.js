const router = require('koa-router')()
const controller = require('../controller/articles')

// 重定向
router.get('/', async ctx => {
  ctx.redirect('/articles')
})

// 渲染文章发表页
router.get('/create', controller.getArticlesCreate)

// 提交文章表单
router.post('/create', controller.postArticlesCreate)

// 渲染全部文章 / 我的文章页
router.get('/articles', controller.getArticles)

// 渲染文章详情页
router.get('/articles/:id', controller.getArticleDetail)

// 提交评论
router.post('/comment', controller.postComment)

module.exports = router
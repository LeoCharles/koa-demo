const router = require('koa-router')()
const articlesController = require('../controller/articles')
const commentsController = require('../controller/comments')

// 重定向
router.get('/', async ctx => {
  ctx.redirect('/articles')
})

// 渲染文章发表页
router.get('/create', articlesController.getArticlesCreate)

// 提交文章表单
router.post('/create', articlesController.postArticlesCreate)

// 文章编辑页
router.get('/edit/:id', articlesController.getArticlesEdit)

// 提交文章编辑表单
router.post('/edit/:id', articlesController.postArticlesEdit)

// 删除文章
router.delete('/delete/:id', articlesController.deleteArticle)

// 渲染全部文章 / 我的文章页
router.get('/articles', articlesController.getArticles)

// 渲染文章详情页
router.get('/articles/:id', articlesController.getArticleDetail)

// 查询评论
router.get('/comments', commentsController.getComments)

// 提交评论
router.post('/comment', commentsController.postComment)

// 删除评论
router.delete('/comment/:id', commentsController.deleteComment)


module.exports = router
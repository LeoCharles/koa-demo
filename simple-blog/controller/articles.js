const mysql = require('../utils/mysql')
const dayjs = require('dayjs')
const { checkLogin, replaceDirtyStr } = require('../utils/index')
const md = require('markdown-it')() // markdown 语法解析器

// 渲染文章发表页
exports.getArticlesCreate = async ctx => {
  await checkLogin(ctx)
  await ctx.render('create', {
    session: ctx.session
  })
}

// 提交文章
exports.postArticlesCreate = async ctx => {
  const { title, content } = ctx.request.body
  const newTitle = replaceDirtyStr(title) // 转义非法字符
  const newContent = md.render(content)   // 将 markdown 语法解析成 HTML 
  const name = ctx.session.user
  const avatar = ctx.session.avatar
  const uid = ctx.session.id
  const time = dayjs().format('YYYY-MM-DD HH:mm:ss')

  if (!title || !content || !name || !avatar || !uid) {
    return ctx.body = {
      code: 500,
      msg: '参数错误'
    }
  }

  try {
    // 插入数据库
    await mysql.insertArticles([name, uid, avatar, newTitle, newContent, time])
    return ctx.body = {
      code: 200,
      msg: '文章发表成功'
    }
  } catch (error) {
    return ctx.body = {
      code: 500,
      msg: '文章发表失败'
    }
  }
}

// 查询文章列表，渲染文章页
exports.getArticles = async ctx => {
  let articles = []
  let name = ''

  // 通过查询参数获取用户名
  if (ctx.querystring) {
    // url 传参使用 decodeURIComponent 解码
    name = decodeURIComponent(ctx.querystring.split('=')[1])
  }
  
  if (name) {
    // 根据用户名查找文章列表
    articles = await mysql.findArticlesByName(name)
  } else {
    // 查询所有文章
    articles = await mysql.findAllArticles()
  }

  await ctx.render('articles', {
    type: name ? 'self' : 'all',  // all: 全部文章; self: 我的文章
    session: ctx.session,
    articles: articles
  })
}

// 文章详情
exports.getArticleDetail = async ctx => {
  let articles = []
  let comments = []

  const articleId = ctx.params.id
  if (articleId) {
    // 根据 id 查文章列表
    articles = await mysql.findArticlesById(articleId)
    // 根据 id 查文章评论列表
    comments = await mysql.findCommentsByArticleId(articleId)
    // 根据 id 查询文章评论总数
    const row = await mysql.findCommentCountByArticleId(articleId)
    // 更新文章评论数
    await mysql.updateArticleComment(articleId, row[0].count)
    // 更新文章阅读量
    await mysql.updateArticlePv(articleId)

  }
  await ctx.render('detail', {
    session: ctx.session,
    article: articles.length ? articles[0] : null,
    comments: comments
  })
}

// 提交评论
exports.postComment = async ctx => {
  const { content, articleId } = ctx.request.body
  const name = ctx.session.user
  const avatar = ctx.session.avatar
  const time = dayjs().format('YYYY-MM-DD HH:mm:ss')

  if (!content || !articleId || !name || !avatar) {
    return ctx.body = {
      code: 500,
      msg: '参数错误'
    }
  }

  try {
    await mysql.insertComment([name, avatar, content, time, articleId])
    return ctx.body = {
      code: 200,
      msg: '评论发表成功'
    }
  } catch (error) {
    return ctx.body = {
      code: 500,
      msg: '评论发表失败'
    }
  }
}
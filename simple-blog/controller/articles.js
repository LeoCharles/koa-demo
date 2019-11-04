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
  if (!title || !content ) {
    return ctx.body = {
      code: 500,
      msg: '参数错误'
    }
  }

  // 转义非法字符
  const newTitle = replaceDirtyStr(title)
  // 将 markdown 语法解析成 HTML 
  const newContent = md.render(content)

  try {
    // 根据用户名查询用户信息
    const name = ctx.session.user
    const userData = await mysql.findUserByName(name)
    if(userData.length === 0) {
      return ctx.body = {
        code: 500,
        msg: '未找到用户信息'
      }
    }
    const avatar = userData[0]['avatar']
    const uid = ctx.session.id
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss')

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

  const articleId = ctx.params.id
  if (articleId) {
    articles = await mysql.findArticlesById(articleId)
    await mysql.updateArticlePv(articleId)
  }
  console.log(articles[0])
  await ctx.render('detail', {
    session: ctx.session,
    article: articles.length ? articles[0] : null
  })
}

// 提交评论
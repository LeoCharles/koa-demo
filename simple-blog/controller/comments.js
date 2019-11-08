const mysql = require('../utils/mysql')
const dayjs = require('dayjs')

// 分页查询文章评论
exports.getComments = async ctx => {
  let commentPage = 1
  let commentSize = 10
  let articleId = null

  if (ctx.query.aid) {
    articleId = ctx.query.aid
  }
  if (ctx.query.page) {
    commentPage = Number(ctx.query.page)
  }

  if (!articleId) {
    return ctx.body = {
      code: 500,
      msg: '参数错误'
    }
  }
  try {
    // 查询文章评论总数
    const commentRows = await mysql.findCommentCountByArticleId(articleId)
    commentCount = commentRows[0].count

    if ( (commentPage - 1) * commentSize > commentCount) {
      return ctx.body = {
        code: 500,
        msg: '评论查询失败, 页码错误'
      }
    }
    // 分页查询评论
    comments = await mysql.findCommentsByArticleId(articleId, commentPage, commentSize)

    return ctx.body = {
      code: 200,
      msg: '评论查询成功',
      data: {
        comments,
        commentCount,
        commentPage,
        commentSize
      }
    }
    
  } catch (error) {
    return ctx.body = {
      code: 500,
      msg: '评论查询失败'
    }
  }
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

// 删除评论
exports.deleteComment = async ctx => {
  const commentId = ctx.params.id
  const name = ctx.session.user

  if (!commentId) {
    return ctx.body = {
      code: 500,
      msg: '参数错误'
    }
  }

  try {
    const rows = await mysql.findCommentById(commentId)
    if (rows[0]['name'] !== name) {
      return ctx.body = {
        code: 500,
        msg: '无操作权限'
      }
    }

    // 从数据库中删除
    await mysql.deleteComment(commentId)
    return ctx.body = {
      code: 200,
      msg: '删除评论成功'
    }
  } catch (error) {
    return ctx.body = {
      code: 500,
      msg: '删除评论失败'
    }
  }
}
const mysql = require('mysql')
const config = require('../config/index')

// 创建连接池
const pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
})

// 数据库操作
const query = (sql, data) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error)
        console.log('数据库连接失败', error)
      } else {
        connection.query(sql, data, (err, rows) => {
          if (err) {
            reject(err)
            console.log('数据库操作失败', err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

// 用户表
const users = `
  CREATE TABLE IF NOT EXISTS users(
    id       INT          NOT NULL AUTO_INCREMENT,
    name     VARCHAR(100) NOT NULL COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    avatar   VARCHAR(100) NOT NULL COMMENT '头像',
    time     VARCHAR(40)  NOT NULL COMMENT '注册时间',
    PRIMARY KEY (id)
  );
`
// 文章表
const articles = `
  CREATE TABLE IF NOT EXISTS articles(
    id       INT          NOT NULL AUTO_INCREMENT,
    uid      VARCHAR(40)  NOT NULL COMMENT '用户id',
    name     VARCHAR(100) NOT NULL COMMENT '作者',
    avatar   VARCHAR(100) NOT NULL COMMENT '头像',
    title    TEXT(0)      NOT NULL COMMENT '文章标题',
    content  TEXT(0)      NOT NULL COMMENT '文章内容',
    markdown TEXT(0)      NOT NULL COMMENT 'markdown',
    status   VARCHAR(40)  NOT NULL DEFAULT '1' COMMENT '文章状态',
    time     VARCHAR(40)  NOT NULL COMMENT '发布时间',
    pv       VARCHAR(40)  NOT NULL DEFAULT '0' COMMENT '浏览量',
    comment  VARCHAR(40)  NOT NULL DEFAULT '0' COMMENT '评论数',
    PRIMARY KEY (id)
  );
`
// 评论表
const comments = `
  CREATE TABLE IF NOT EXISTS comments(
    id        INT          NOT NULL AUTO_INCREMENT,
    articleid VARCHAR(40)  NOT NULL COMMENT '文章id',
    name      VARCHAR(100) NOT NULL COMMENT '用户名称',
    avatar    VARCHAR(100) NOT NULL COMMENT '头像',
    content   TEXT(0)      NOT NULL COMMENT '评论内容',
    time      VARCHAR(40)  NOT NULL COMMENT '评论时间',
    PRIMARY KEY (id)
  );
`

// 建表
const createTable = (sql) => {
  return query(sql, [])
}
createTable(users)
createTable(articles)
createTable(comments)

// 新增用户
exports.insertUser = (data) => {
  const sql = 'INSERT INTO users SET name=?, password=?, avatar=?, time=?;'
  return query(sql, data)
}

// 删除用户
exports.deleteUser = (id) => {
  const sql = `DELETE FROM users WHERE id=${id};`
  return query(sql)
}

// 通过用户名查找用户，注意 name 是字符串类型，必须用引号
exports.findUserByName = (name) => {
  const sql = `SELECT * FROM users WHERE name='${name}';`
  return query(sql)
}

// 发表文章
exports.insertArticle = (data) => {
  const sql = 'INSERT INTO articles SET name=?, uid=?, avatar=?, title=?, markdown=?, content=?, time=?;'
  return query(sql, data)
}

// 修改文章
exports.updateArticle = (data) => {
  const sql = 'UPDATE articles SET title=?, markdown=?, content=? WHERE id=?'
  return query(sql, data)
}

// 删除文章
exports.deleteArticle = (id) => {
  const sql = `DELETE FROM articles WHERE id=${id};`
  return query(sql)
}

// 删除文章的所有评论
exports.deleteArticleComment = (id) => {
  const sql = `DELETE FROM comments WHERE articleid=${id};`
  return query(sql)
}

// 查询所有文章 - 分页，默认每页 10 条
exports.findAllArticles = (page, size = 10) => {
  const sql = `SELECT * FROM articles LIMIT ${(page - 1) * size}, ${size};`
  return query(sql)
}

// 查询所有文章数量
exports.findAllArticlesCount = () => {
  const sql = `SELECT COUNT(*) AS count FROM articles;`
  return query(sql)
}

// 通过用户名查询文章
exports.findArticlesByName = (name, page, size = 10) => {
  const sql = `SELECT * FROM articles WHERE name='${name}' ORDER BY id DESC LIMIT ${(page - 1) * size}, ${size};`
  return query(sql)
}

// 查询个人所有文章数
exports.findArticlesCountByName = (name) => {
  const sql = `SELECT COUNT(*) AS count FROM articles WHERE name='${name}';`
  return query(sql)
}

// 通过文章 id 查询文章
exports.findArticlesById = (id) => {
  const sql = `SELECT * FROM articles WHERE id='${id}';`
  return query(sql)
}

// 增加文章浏览量
exports.updateArticlePv = (id) => {
  const sql = `UPDATE articles SET pv= pv + 1 WHERE id='${id}';`
  return query(sql)
}

// 更新文章评论数
exports.updateArticleComment = (id, count) => {
  const sql = `UPDATE articles SET comment='${count}' WHERE id='${id}';`
  return query(sql)
}

// 分页查询文章评论
exports.findCommentsByArticleId = (id, page, size = 10) => {
  const sql =`SELECT * FROM comments WHERE articleid='${id}' LIMIT ${(page - 1) * size}, ${size};`
  return query(sql)
}

// 查询文章评论数
exports.findCommentCountByArticleId = (id) => {
  const sql =`SELECT COUNT(*) AS count FROM comments WHERE articleid='${id}';`
  return query(sql)
}

// 查询评论
exports.findCommentById = (id) => {
  const sql =`SELECT * FROM comments WHERE id='${id}';`
  return query(sql)
}

// 发表文章评论
exports.insertComment = (data) => {
  const sql = 'INSERT INTO comments SET name=?, avatar=?, content=?, time=?, articleid=?;'
  return query(sql, data)
}

// 删除评论
exports.deleteComment = (id) => {
  const sql = `DELETE FROM comments WHERE id=${id};`
  return query(sql)
}
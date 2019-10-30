const mysql = require('mysql')
const config = require('../config/index')

// 创建连接池
const pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
})

// 数据库查询
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error)
        console.log('数据库连接失败')
      } else {
        connection.query(sql, params, (err, rows) => {
          if (err) {
            reject(err)
            console.log('数据库操作失败')
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
  CREATE TABLE IF NOT EXIST users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    avatar VARCHAR(100) NOT NULL COMMENT '头像',
    time VARCHAR(40) NOT NULL COMMENT '注册时间',
    PRIMARY KEY (id)
  );
`
// 文章表
const articles = `
  CREATE TABLE IF NOT EXIST articles(
    id INT NOT NULL AUTO_INCREMENT,
    uid VARCHAR(40) NOT NULL COMMENT '用户id',
    name VARCHAR(100) NOT NULL COMMENT '作者',
    avatar VARCHAR(100) NOT NULL COMMENT '头像',
    title TEXT(0) NOT NULL COMMENT '文章标题',
    content TEXT(0) NOT NULL COMMENT '文章内容',
    md TEXT(0) NOT NULL COMMENT 'markdown',
    status VARCHAR(40) NOT NULL DEFAULT '1' COMMENT '文章状态',
    time VARCHAR(40) NOT NULL COMMENT '发布时间',
    pv VARCHAR(40) NOT NULL DEFAULT '0' COMMENT '浏览量',
    comment VARCHAR(40) NOT NULL DEFAULT '0' COMMENT '评论数',
    PRIMARY KEY (id)
  );
`
// 评论表
const comments = `
  CREATE TABLE IF NOT EXIST comments(
    id INT NOT NULL AUTO_INCREMENT,
    articleid VARCHAR(40) NOT NULL COMMENT '文章id',
    name VARCHAR(100) NOT NULL COMMENT '用户名称',
    avatar VARCHAR(100) NOT NULL COMMENT '头像',
    content TEXT(0) NOT NULL COMMENT '评论内容',
    time VARCHAR(40) NOT NULL COMMENT '评论时间',
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
exports.insertUser = (params) => {
  const sql = 'INSERT INTO users set name=?,password=?,avatar=?,time=?;'
  return query(sql, params)
}

// 删除用户
exports.deleteUser = (id) => {
  const sql = `DELETE FROM users WHERE id=${id};`
  return query(sql)
}

// 查找用户
exports.findUser = (id) => {
  const sql = `SELETE * FROM users WHERE id=${id};`
  return query(sql)
}
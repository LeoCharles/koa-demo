const JWT = require('jsonwebtoken')

// token 的秘钥（随意定义的字符串），不能暴露给前端
const JWT_SECRET = 'koa-demo-user-token'

// 生成 token
const createToken = (config = {}, expiresIn = '1 days') => {
  const { userName, _id } = config
  const options = { userName, _id }
  const custom = { expiresIn }
  
  // 生成 token
  return JWT.sign(options, JWT_SECRET, custom)
}

// 解析 token
const decodeToken = (token) => {
  return JWT.decode(token)
}

// 从 ctx 中解析 authorization
const parseAuth = (ctx) => {
  if (!ctx || !ctx.header.authorization) return null

  const parts = ctx.header.authorization.split(' ')
  if (parts.length < 2) return null
  return parts[1]
}

module.exports = {
  JWT_SECRET,
  createToken,
  decodeToken,
  parseAuth
}
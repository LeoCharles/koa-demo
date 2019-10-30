const fs = require('fs')

// 注册页面
exports.getRegister = async ctx => {
  await ctx.render('register', {
    session: ctx.session
  })
}

// 登录页面
exports.getLogin = async ctx => {
  await ctx.render('login', {
    session: ctx.session
  })
}

// 提交登录表单数据
exports.postLogin = async ctx => {
  // 表单数据
  const {name, password, avatar} = ctx.request.body
}
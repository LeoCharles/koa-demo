const mysql = require('../utils/mysql')
const md5 = require('md5')
const dayjs = require('dayjs')
const { getRandomStr, uploadImage } = require('../utils/index')

// 注册页面
exports.getRegister = async ctx => {
  await ctx.render('register', {
    session: ctx.session
  })
}

exports.postRegister = async ctx => {
  const { name, password, avatar } = ctx.request.body
  // 先查询数据判断用户名是否存在
   const rows = await mysql.findUserByName(name)
    if (rows.length !== 0) {
      return ctx.body = {
        code: 500,
        msg: '用户名已存在'
      }
    }

    // 用户名不存在时，在数据库中插入数据
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const imageName = getRandomStr() + '.png'
    const path = './simple-blog/public/img/' + imageName

    // 判断头像是否上传成功
    const upload= await uploadImage(avatar, path)
    if(!upload) {
      console.log('头像上传失败')
      return ctx.body = {
        code: 500,
        msg: '头像上传失败'
      }
    }
    try {
      await mysql.insertUser([name, md5(password), imageName, time])
      // 开始插入数据
      console.log('注册成功')
      return ctx.body = {
        code: 200,
        msg: '注册成功'
      }
    } catch (err) {
      console.log(err)
      return ctx.body = {
        code: 500,
        msg: '注册失败'
      }
    }
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
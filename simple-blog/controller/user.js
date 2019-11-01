const mysql = require('../utils/mysql')
const md5 = require('md5')
const dayjs = require('dayjs')
const { getRandomStr, uploadImage, checkLogin } = require('../utils/index')

// 渲染注册页面
exports.getRegister = async ctx => {
  // 检查是否已登录
  await checkLogin(ctx)
  await ctx.render('register', {
    session: ctx.session
  })
}

// 提交注册表单
exports.postRegister = async ctx => {
  const { name, password, avatar } = ctx.request.body
  if (!name || !password || !avatar) {
    return ctx.body = {
      code: 500,
      msg: '参数错误'
    }
  }

  try {
    // 查询数据库，判断用户名是否存在
    const rows = await mysql.findUserByName(name)
    if (rows.length !== 0) {
      return ctx.body = {
        code: 500,
        msg: '用户名已存在'
      }
    }

    // 上传头像
    const imageName = getRandomStr() + '.png'
    const path = './simple-blog/public/img/avatar/' + imageName
    const upload= await uploadImage(avatar, path)
    // 判断头像是否上传成功
    if(!upload) {
      console.log('头像上传失败')
      return ctx.body = {
        code: 500,
        msg: '头像上传失败'
      }
    }
    
    // 向数据库中插入数据
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss')
    await mysql.insertUser([name, md5(password), imageName, time])
    console.log('注册成功')
    return ctx.body = {
      code: 200,
      msg: '注册成功'
    }

  } catch (err) {
    console.log('注册失败', err)
    return ctx.body = {
      code: 500,
      msg: '注册失败'
    }
  }
}

// 渲染登录页面
exports.getLogin = async ctx => {
  // 检查是否已登录
  await checkLogin(ctx)
  await ctx.render('login', {
    session: ctx.session
  })
}

// 提交登录表单
exports.postLogin = async ctx => {
  const { name, password } = ctx.request.body
  try {
    // 查询数据库，判断用户密码是否正确
    const rows = await mysql.findUserByName(name)
    if(rows.length && rows[0]['name'] === name && rows[0]['password'] === md5(password)) {
      console.log('登录成功')
      // 登录成功保存 session 信息
      ctx.session = {
        user:  rows[0]['name'],
        id: rows[0]['id']
      }
      return ctx.body = {
        code: 200,
        msg: '登录成功'
      }
    } else {
      return ctx.body = {
        code: 500,
        msg: '用户名或密码错误'
      }
    }
  } catch (err) {
    console.log('登录失败', err)
    return ctx.body = {
      code: 500,
      msg: '登录失败'
    }
  }
}

// 登出
exports.getLogout = async ctx => {
  ctx.session = null
  return ctx.body = {
    code: 200,
    msg: '登出成功'
  }
}
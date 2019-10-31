const router = require('koa-router')()
const controller = require('../controller/user')

// 注册页面
router.get('/register', controller.getRegister)

// POST 提交注册表单
router.post('/register', controller.postRegister)

// 注册页面
router.get('/login', controller.getLogin)

// POST 提交登录表单
router.post('/login', controller.postLogin)

// 登出
router.get('/logout', controller.getLogout)

module.exports = router
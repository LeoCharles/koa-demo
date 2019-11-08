const router = require('koa-router')()
const userController = require('../controller/user')

// 注册页面
router.get('/register', userController.getRegister)

// POST 提交注册表单
router.post('/register', userController.postRegister)

// 注册页面
router.get('/login', userController.getLogin)

// POST 提交登录表单
router.post('/login', userController.postLogin)

// 登出
router.get('/logout', userController.getLogout)

module.exports = router
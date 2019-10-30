const router = require('koa-router')()
const controller = require('../controller/user')

// 注册页面
router.get('/login', controller.getLogin)

// POST 提交登录表单
router.post('/login', controller.postLogin)

module.exports = router
const router = require('koa-router')()
const conttoller = require('../controller/user')

// 注册页面
router.get('/register', conttoller.getRegister)

// POST 提交注册表单
router.post('/resiter')

module.exports = router
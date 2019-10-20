const Koa = require('koa')
// const logger = require('./middleware/logger') // 自定义 log
// const logger = require('koa-logger') // koa-logger
const log4js = require('log4js')
const app = new Koa()

/* 日志相关的 demo */

// 把日志中间件放在最前面
// app.use(logger()) // 使用 koa-logger 中间件

// log4js 最简单用法
// // 获取 log4js 的实例，用法和 console 一致，也有 .info .error 等方法
// const logger = log4js.getLogger('test')
// // 设置 log 级别
// logger.level = 'debug'
// // 使用
// logger.debug(new Date(), 'some debug messages')

// 配置
log4js.configure({
  appenders: {
    // 输出到控制台
    console: {
      type: 'console',
      layout: {type: 'colored'} // 设置输出格式
    },
    // 输出到文件
    log_file: {
      type: 'file',
      filename: './logs/info.log', // 文件名，不存在时会自动创建
      maxLogSize : 20971520, // 文件最大存储空间（byte）
      encoding : 'utf-8', // 文件的编码
    },
    // 输出日期文件
    date_file: {
      type: 'dateFile',
      filename: './logs/date',
      alwaysIncludePattern: true, // 将模式包含在当前日志文件的名称中，默认为 false
      pattern: ".yyyy-MM-dd.log", // 日期模式，默认为 .yyyy-MM-dd
      daysToKeep: 10, // 文件保存天数
      compress: false, //是否压缩
    }
  },
  // log 类型，定义 log 不同的输出方式
  categories: {
    default: {appenders: ['console', 'log_file', 'date_file'], level: 'info'}, // 默认输出 info 及以上级别
    console: { appenders: ['console'], level: 'debug'}, // 输出 debug 及以上级别的日志到控制台
    debug: { appenders: ['console', 'log_file'], level: 'debug'}, // 调试环境，输出 debug 及以上级别的日志到控制台和 log 文件
    production: { appenders: ['date_file'], level: 'warn'}, // 生产环境，输出 warn 及以上级别的日志到按日期命名的 log文件
  }
})

// 使用
const logger = log4js.getLogger() // 默认 logger
logger.info('categories-default test, this is info')
logger.debug('categories-default test, this is debug') // 不会输出
logger.warn('categories-default test, this is warn')
logger.error('categories-default test, this is error')

const productLogger = log4js.getLogger('production') // 生产环境 logger
productLogger.info('categories-production test, this is info') // 不会输出
productLogger.warn('categories-production test, this is warn')
productLogger.error('categories-production test, this is error')

app.use(async (ctx) => {
  ctx.body = 'hello world'
})

app.listen(3000, () => console.log('http server is running at port 3000'))
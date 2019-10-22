let dbConf = null

// 开发环境数据库
const DEV = {
  database: 'koa_demo',  // 数据库
  user: 'root',          // 用户
  password: '123456',    // 密码
  port: 3306,            // 端口
  host: 'localhost',     // 主机
}

dbConf = DEV

module.exports = dbConf
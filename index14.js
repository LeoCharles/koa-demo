const Koa = require('koa')
const mysql = require('mysql')
const app = new Koa()

/* 数据库 */

// 连接 mysql
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '123456',
//   database: 'koa_demo'
// })

// // 查询数据库
// connection.query('SELECT * FROM user', (err, results, fields) => {
//   if (err) throw err
  
//   console.log(results)
// })

// // 结束连接
// connection.end();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'koa_demo'
})

// 在数据池中进行会话操作
pool.getConnection((err, connection) => {
  if (err) throw err

  // 查询数据
  connection.query('SELECT * FROM user', (error, results, fields) => {
    if (error) throw error
    
    console.log(results)

    // 结束链接
    connection.release();
  })
})

// 关闭连接池
// pool.end((err) => {
//   console.log('连接池已关闭')
// })

app.listen(3000, () => console.log('http server is runing at port 3000'))
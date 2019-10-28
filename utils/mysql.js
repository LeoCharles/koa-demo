const mysql = require('mysql')

// 创建连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'koa_demo'
})

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log('数据库连接失败')
        reject(err)
      } else {
        connection.query(sql, params, (err, rows) => {
          if (err){
            console.log('数据库操作失败')
            reject(err)
          } else {
            resolve(rows)
          }
          
          connection.release()
        }) 
      }
    })
  })
}

module.exports = {
  query
}
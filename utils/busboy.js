const Busboy = require('busboy')
const inspect = require('util').inspect // 将对象转成字符串，一般用于调试
const fs = require('fs')
const path = require('path')

// 递归同步创建文件目录
const mkdirsSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

// 上传文件方法，调用时必传 options.path
const uploadFile = (ctx, options = {}) => {

  // 配置参数
  options = Object.assign({
    type: 'common', // 默认文件类型
    path: '/upload' // 默认文件存放目录
  }, options)

  const filePath = path.join(options.path, options.type)

  // 创建文件保存目录
  mkdirsSync(filePath)

  // 通过 原生 Node.js 的 req 创建实例
  const busboy = new Busboy({headers: ctx.req.headers})

  return new Promise((resolve, reject) => {

    // 保存的文件名
    let name = ''

    // 监听文件解析事件 (字段名，文件，文件名，传输编码，mime类型)
    busboy.on('file', (fieldname, file, filename, encode, mimetype) => {
      name = `${Date.now()}_${path.basename(filename)}`

      console.log(`file [${fieldname}] 文件名：${filename}`)

      // 创建可写入流，通过管道，把文件流保存到指定路径
      file.pipe(fs.createWriteStream(path.join(filePath, name)))

      // 开始解析文件流
      file.on('data', (data) => {
        console.log(`File [${fieldname}] 文件已上传 ${data.length} bytes`)
      })

      // 解析文件结束
      file.on('end', () => {
        console.log(`File [${fieldname}] 文件上传结束`)

        // 解析成功
        resolve({
          success: true,
          file: `${options.type}/${name}`
        })
      })
    })

    // 监听请求中的字段
    busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated) => {
      console.log(`File [${fieldname}] value: ${inspect(val)}`)
    })

    // 监听结束事件
    busboy.on('finish', () => {
      console.log('文件解析结束!')
      resolve({
        success: true,
        file: `${options.type}/${name}`
      })
    })

    // 监听解析错误事件
    busboy.on('error', (err) => {
      console.log('文件解析出错')

      // 解析失败
      reject({
        success: false,
        file: null
      })
    })

    // 将流连接到 busboy
    ctx.req.pipe(busboy)
  })
}

module.exports = uploadFile
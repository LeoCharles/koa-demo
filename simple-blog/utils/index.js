/* 后端工具方法 */
const fs = require('fs')

// 生成随机字符串
exports.getRandomStr = () => {
  return Math.random().toString(36).substr(2) + Date.now()
}

// 保存图片
exports.uploadImage = (dataURL, path) => {
  if (!dataURL) return;
  if (!path) return;

  const base64Data = dataURL.replace(/^data:image\/w+;base64,/, '');
  const dataBuffer = new Buffer(base64Data, 'base64')
  return new Promise((resolove, reject) => {
    // 写入文件
    fs.writeFile(path, dataBuffer, (err) => {
      if (err) {
        reject(false)
        throw err
      } else {
        resolove(true)
      }
    })
  })
}
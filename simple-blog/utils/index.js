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
  // 去掉 base64 前面的 data:image\/w+;base64,
  const base64Data = dataURL.replace(/^data:image\/\w+;base64,/, '');
  // 把 base64 转成 buffer 对象
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

// 检查是否已登录
exports.checkLogin = async (ctx) => {
  console.log(ctx.url)
  if (ctx.url === '/login' || ctx.url === '/register') {
    // 已登录跳转到文章列表页
    if (ctx.session && ctx.session.user) {
      return ctx.redirect('/articles')
    }
  } else {
    if (!ctx.session || !ctx.session.user) {
      return ctx.redirect('/login')
    }
  }
}

// 替换非法字符
exports.replaceDirtyStr = (str) => {
  if (!str) return
  return str.replace(/[<>"']/g, target => {
    return {
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[target]
  })
}

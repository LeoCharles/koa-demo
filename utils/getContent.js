const fs = require('fs')
const path = require('path')
const { mimes } = require('./mimes')

// 遍历目录内容（子目录，文件名）
function walk(reqPath) {
  const files = fs.readdirSync(reqPath)
  const dirList = [], fileList = []

  for (let i = 0; i < files.length; i++) {
    const item = files[i]
    const itemArr = item.split('\.')
    let itemMime = itemArr.length > 1 ? itemArr[itemArr.length - 1] : 'undefined'
    
    if( typeof mimes[itemMime] === 'undefined' ) {
      dirList.push(files[i])
    } else {
      fileList.push(files[i])
    }
  }

  return dirList.concat(fileList)
}

// 将目录内容封装成 html
function dir(url, reqPath) {
  // 遍历读取当前目录下的文件
  const contentList = walk(reqPath)

  let html = ''
  for (let [index, item] of contentList.entries()) {
    html += `<li><a href="${url === '/' ? '' : url}/${item}">${item}</a></li>` 
  }

  return `<ul>${html}</ul>`
}

// 读取文件
function file(filePath) {
  return fs.readFileSync(filePath, 'binary')
}

// 获取静态资源内容
async function getContent(ctx, fullStaticPath) {
  // 请求资源的完整路径
  const reqPath = path.join(fullStaticPath, ctx.url)
  // 判断请求路径是否存在目录或文件
  const exist = fs.existsSync(reqPath)

  // 返回内容
  let content = ''

  if(!exist) {
    content = '404 Not Fount!'
  } else {
    // 判断访问地址是文件夹还是文件
    const stat = fs.statSync(reqPath)
    if(stat.isDirectory()) {
      content = dir(ctx.url, reqPath)
    } else {
      content = file(reqPath)
    }
  }

  return content
}

module.exports = getContent
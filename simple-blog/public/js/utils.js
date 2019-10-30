/* 工具函数 */

// 全局提示
function message(text) {
  const $message = $('.message')
  $message.text(text)
  $message.animate({
    top: '20px'
  }, 200)
  setTimeout(() => {
    $message.animate({
      top: '-50px'
    })
  }, 3000)
}

// 获取 base64
function getBase64(url, callback) {
  if (!url) return;

  const image = new Image();
  image.src = url;

  // 图片加载完成
  image.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = image.width;
    const height = image.height;
    // 开始绘图
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
    const dataURL = canvas.toDataURL('image/png')
    // 调用回调
    callback ? callback(dataURL) : null;
  }
}
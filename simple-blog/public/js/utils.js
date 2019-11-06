/**前端工具方法 */

// 全局提示
function message(text) {
  $('body').append('<div class="message"></div>')
  const $message = $('.message')
  $message.text(text)
  $message.animate({
    top: '20px'
  }, 200)
  setTimeout(() => {
    $message.animate({
      top: '-50px',
    }, () => {
      $message.hide('fast', () => {
        $message.remove()
      })
    })
  }, 2000)
}

// 模态框
function modal(options) {
  const modalHtml = `
  <div class="modal">
    <span class="modal-close">X</span>
    <div class="modal-header">标题</div>
    <div class="modal-body"></div>
    <div class="modal-footer">
      <button class="btn btn-small modal-cancel">取消</button>
      <button class="btn btn-small btn-primary modal-ok">确定</button>
    </div>
  </div>
  `
  $('body').append(modalHtml);
  $('body').append('<div class="modal-mask"></div>');

  const $modal = $('.modal');
  const $header = $('.modal-header');
  const $body = $('.modal-body');
  const $close = $('.modal-close');
  const $mask = $('.modal-mask');
  const $cancel = $('.modal-cancel');
  const $ok = $('.modal-ok');

  if (options.title) {
    $header.html(options.title)
  }
  if (options.content) {
    $body.html(options.content)
  }

  // 显示模态框
  $modal.fadeIn()
  $mask.fadeIn()
  // 关闭模态框
  $close.click((e) => {
    $modal.fadeOut('fast', () => {
      $modal.remove();
    })
    $mask.fadeOut('fast', () => {
      $mask.remove();
    })
  })
  // 确定按钮
  $ok.click(() => {
    if(options.onOk && typeof options.onOk === 'function') {
      options.onOk();
    }
    $close.trigger('click');
  })
  // 取消按钮
  $cancel.click(() => {
    if(options.onCancel && typeof options.onCancel === 'function') {
      options.onCancel()
    }
    $close.trigger('click');
  })
  // 监听 ESC
  $(document).keyup((e) => {
    if(e.keyCode === 27) {
      $close.trigger('click');
    }
  })
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

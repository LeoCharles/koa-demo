(function(){
  const uploadBtn = document.getElementById('uploadBtn')
  const progressEle = document.getElementById('progress')
  const pictureEle = document.getElementById('picture')
  
  // 按钮点击事件
  uploadBtn.addEventListener('click', () => {
    // 上传文件
    uploadEvent({
      // 上传成功
      success: (res) => {
        console.log(res, res.file)
        if (res && res.file) {
          // 插入预览图片
          pictureEle.innerHTML = `<img src="${res.file}" width="100" height="100"/>`
        }
      },
      progress:(percent) => {
        progressEle.innerText = percent
      },
      // 上传失败
      file: (err) => {
        console.log(err)
      }
    })
  })

  // 发送 ajax 请求
  function requestEvent(options) {
    try {
      const formData = options.formData
      const xhr = new XMLHttpRequest()

      xhr.onreadystatechange = () => {
        // 请求成功的回调
        if (xhr.readyState === 4 && xhr.status === 200) {
          options.success(JSON.parse(xhr.responseText))
        }
      }
      
      // 监听上传进度
      xhr.upload.onprogress = (e) => {
        const loaded = e.loaded
        const total = e.total
        const percent = Math.floor(100 * loaded / total)
        // 上传进度回调
        options.progress(percent)
      }

      // 发送请求
      xhr.open('post', '/upload')
      xhr.send(formData)

    } catch (err) {
      options.fail(err)
    }
  }

  // 手动创建 input 选择文件后发送请求
  function uploadEvent(options) {
    // 创建 formData
    const formData = new FormData()
    let file = null

    // 创建 input 元素
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('name', 'myfile')

    // 手动触发点击事件，进行文件选择
    input.click()

    // 监听文件选择
    input.onchange = (e) => {
      // 选择的文件
      file = input.files[0]
      formData.append('myfile', file)

      // 发送请求
      requestEvent({
        formData,
        success: options.success,     // 成功的回调
        file: options.fail,           // 失败的回调
        progress: options.progress    // 上传进度回调
      })
    }
  }

})()
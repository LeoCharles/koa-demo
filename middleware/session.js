const uuid = require('uuid') // 生成 唯一 ID

// 存储 session 信息
const STORE = []

const session = () => async(ctx, next) => {
  // 获取 sid
  const sid = ctx.cookies.get('sid')
  const _session = {user: null, sid: null}

  if (sid) {
    // 如果 sid 存在，查找就获取对应的 session 信息
    const index = STORE.find(item => item.sid === sid)
    index >=0 && (_session = STORE[index])
  }

  // 把 session 添加到 ctx
  ctx.session = {
    ..._session,
    create(user) {
      const sid = uuid.v4() // 生成唯一 id
      this.user = user
      this.sid = sid
      // 写入 cookie
      ctx.cookies.set('sid', sid)
      // 添加到 store
      STORE.push({user, sid})
      console.log(STORE)
    },
    destory() {
      const index = STORE.find(item => item.sid === this.sid)
      this.user = null
      this.sid = null
      STORE.splice(index, 1)
      console.log(STORE)
    }
  }
  await next()
}

module.exports = session
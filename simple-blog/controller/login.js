const fs = require('fs')

exports.getLogin = async ctx => {
  await ctx.render('login', {
    session: ctx.session
  })
}
function getChat(parent, args, ctx, info) {
  const { first, skip } = args
  return ctx.db.query.messages({ first, skip }, info)
}

module.exports = {
  getChat,
}

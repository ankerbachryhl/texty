function messages(parent, args, ctx, info) {
  const { first, skip } = args
  return ctx.db.query.messages({ first, skip }, info)
}

function chats(parent, args, ctx, info) {
  return ctx.db.query.chats({}, info)
}

module.exports = {
  messages,
  chats,
}

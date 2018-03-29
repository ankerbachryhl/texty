const newMessage = {
  subscribe: (parent, args, ctx, info) => {
    return ctx.db.subscription.message(
      {},
      info,
    )
  }
}

module.exports = {
  newMessage,
}

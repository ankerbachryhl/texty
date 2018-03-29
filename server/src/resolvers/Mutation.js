const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

function createMessage(parent, args, context, info) {
  const { content } = args;
  const userId = getUserId(context);
  return context.db.mutation.createMessage({
    data: { content, sendBy: { connect: { id: userId }} }}, info);
}

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.db.mutation.createUser({
    data: { ...args, password }
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  const user = await context.db.query.user({ where: { email: args.email }});
  if (!user) {
    throw new Error(`Could not find a user with the e-mail: ${args.email}`)
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Not to tilt you but the text you entered doesnt match your account password :/')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  }
}

module.exports = {
  createMessage,
  signup,
  login,
}

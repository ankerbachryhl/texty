const jwt = require('jsonwebtoken')

const APP_SECRET = "secretToAssignJSWTokens"

function getUserId(context) {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId
  }

  throw new Error('Sorry my dear - you are not authenticated')
}

module.exports = {
  APP_SECRET,
  getUserId,
}

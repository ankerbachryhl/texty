function onError(error) {
  const errorMessage = error.message.replace('GraphQL error:', '')

  return (
    errorMessage
  )
}

export default onError;

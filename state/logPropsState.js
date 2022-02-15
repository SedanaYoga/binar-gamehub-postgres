let logProps = {
  isLogged: false,
  loggedAs: {
    uuid: '',
    userId: '',
    username: '',
    isAdmin: false,
  },
}

exports.setLogProps = (isLogged, uuid, userId, username, isAdmin) => {
  logProps.isLogged = isLogged
  logProps.loggedAs.uuid = uuid
  logProps.loggedAs.userId = userId
  logProps.loggedAs.username = username
  logProps.loggedAs.isAdmin = isAdmin
}

exports.getLogProps = () => {
  return logProps
}

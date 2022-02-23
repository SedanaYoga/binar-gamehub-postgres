const asyncHandler = require('express-async-handler')
const { UserGame, getLogProps, setLogProps } = require('../../models')
const logProps = getLogProps()

exports.renderHomePage = asyncHandler(async (req, res) => {
  if (logProps.isLogged === true) {
    const loggedUser = await UserGame.findOne({
      where: {
        uuid: logProps.loggedAs.uuid,
      },
    })
    if (!loggedUser) {
      setLogProps(false, '', '', '', false)
    }
  }
  res.render('home', { logProps })
})

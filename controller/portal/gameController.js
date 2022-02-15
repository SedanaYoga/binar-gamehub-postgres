const asyncHandler = require('express-async-handler')
const { UserGame, UserGameBiodata, UserHistory } = require('../../models')
const { getLogProps, setLogProps } = require('../../state/logPropsState.js')
const findUsersHandler = require('../../utils/userHelper.js')
const logProps = getLogProps()

exports.renderGamePage = asyncHandler((_, res) => {
  if (!logProps.isLogged) return res.redirect('/signin')
  res.render('rps')
})

exports.addHistoryControl = asyncHandler(async (req, res) => {
  const { score } = req.body
  await UserGameHistory.create({
    user_id: logProps.loggedAs.uuid,
    fk_userId_histories: logProps.loggedAs.userId,
    score: +score,
  })

  return res.status(200).json({ message: 'Successfully added score!' })
})

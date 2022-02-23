const asyncHandler = require('express-async-handler')
const { getLogProps, UserGameHistory } = require('../../models')
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

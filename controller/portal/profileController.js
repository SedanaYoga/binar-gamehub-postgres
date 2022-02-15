const asyncHandler = require('express-async-handler')
const { UserGame, UserGameBiodata, UserHistory } = require('../../models')
const { getLogProps, setLogProps } = require('../../state/logPropsState.js')
const findUsersHandler = require('../../utils/userHelper.js')
const logProps = getLogProps()

exports.renderProfilePage = asyncHandler(async (req, res) => {
  const paramsUuid = req.params.uuid
  const user = await findUsersHandler(
    ['biodata', 'histories'],
    'one',
    paramsUuid
  )
  const winCount = user.histories.filter((e) => e.score > 0).length.toString()
  const loseCount = user.histories.filter((e) => e.score < 0).length.toString()
  const drawCount = user.histories
    .filter((e) => (e.score = 0))
    .length.toString()

  res.render('profile', { user, winCount, loseCount, drawCount })
})

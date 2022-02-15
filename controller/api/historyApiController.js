const asyncHandler = require('express-async-handler')
const { UserGameBiodata, UserGameHistory } = require('../../models')
const findHistoryHandler = require('../../utils/historyHelper.js')
const findUserHandler = require('../../utils/userHelper.js')

exports.getAllHistoryApiControl = asyncHandler(async (req, res) => {
  const history = await findHistoryHandler('all')
  return res.json(history)
})
exports.getOneHistoryApiControl = asyncHandler(async (req, res) => {
  const paramsUuid = req.params.uuid
  const history = await findHistoryHandler('one', paramsUuid)
  res.json(history)
})

exports.createHistoryApiControl = asyncHandler(async (req, res) => {
  const { user_uuid, score } = req.body

  const user = await findUserHandler([], 'one', user_uuid)
  console.log(user.id)
  if (!user || user === null) {
    return res.json({ message: 'User not found / wrong User UUID' })
  }

  const adjustedScore = score >= 1 ? 1 : score <= -1 ? -1 : 0

  await UserGameHistory.create({
    user_id: user_uuid,
    fk_userId_histories: user.id,
    score: adjustedScore,
  })

  return res.status(200).json({
    message: `Successfully added ${adjustedScore} to User with UUID: ${user_uuid}`,
  })
})

exports.updateHistoryApiControl = asyncHandler(async (req, res) => {
  const { score } = req.body
  const paramsUuid = req.params.uuid
  try {
    await UserGameBiodata.update(
      {
        score,
      },
      {
        where: {
          uuid: paramsUuid,
        },
      }
    )
    return res.json({
      score,
      message: 'Score is successfully updated!',
    })
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' })
  }
})

exports.deleteHistoryApiControl = asyncHandler(async (req, res) => {
  await UserGameHistory.destroy({
    where: {
      uuid: req.params.uuid,
    },
  })
  return res.json({
    message: `History with UUID: ${req.params.uuid} has been removed`,
  })
})

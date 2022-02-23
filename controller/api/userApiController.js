const asyncHandler = require('express-async-handler')
const { UserGame, UserGameBiodata } = require('../../models')
const findUsersHandler = require('../../utils/userHelper.js')

exports.getAllUsersApiControl = asyncHandler(async (req, res) => {
  const users = await findUsersHandler(['biodata', 'histories'], 'all')
  return res.json(users)
})
exports.getOneUserApiControl = asyncHandler(async (req, res) => {
  const paramsUuid = req.params.uuid
  const user = await findUsersHandler(
    ['biodata', 'histories'],
    'one',
    paramsUuid
  )
  res.status(200).json(user)
})
exports.createUserApiControl = asyncHandler(async (req, res) => {
  if (
    !req.body.username ||
    req.body.username === '' ||
    !req.body.email ||
    req.body.email === '' ||
    !req.body.password ||
    req.body.password === ''
  )
    return res.status(400).json({ message: 'Please enter all user data' })

  const { username, email, password } = req.body
  const isAdmin = req.body.isAdmin ? true : false

  try {
    const user = await UserGame.create({
      username,
      email,
      password,
      isAdmin,
    })

    await UserGameBiodata.create({
      user_id: user.uuid,
      fk_userId_biodata: user.id,
    })

    return res.json(user)
  } catch (err) {
    return res.status(400).json(err)
  }
})
exports.updateUserApiControl = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  const paramsUuid = req.params.uuid

  if (
    email === '' ||
    email === null ||
    username === '' ||
    username === null ||
    password === '' ||
    password === null
  ) {
    return res.json({ message: 'Please enter username, email, and password!' })
  }
  await UserGame.update(
    {
      email,
      username,
      password,
    },
    {
      where: {
        uuid: paramsUuid,
      },
    }
  )
  return res.json({
    email,
    username,
    password,
    message: 'Successfully updated!',
  })
})
exports.deleteUserApiControl = asyncHandler(async (req, res) => {
  await UserGame.destroy({
    where: {
      uuid: req.params.uuid,
    },
  })
  await UserGameBiodata.destroy({
    where: {
      user_id: req.params.uuid,
    },
  })
  return res.json({
    message: `User with UUID: ${req.params.uuid} has been removed`,
  })
})

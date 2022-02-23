const asyncHandler = require('express-async-handler')
const { UserGame, UserGameBiodata, getLogProps } = require('../../models')
const findUsersHandler = require('../../utils/userHelper.js')
const logProps = getLogProps()

exports.getAllUsersControl = asyncHandler(async (req, res) => {
  const users = await findUsersHandler(['biodata', 'histories'], 'all')
  return res.json(users)
})

exports.renderDashboardPage = asyncHandler(async (req, res) => {
  if (!logProps.loggedAs.isAdmin) return res.redirect('/')

  const users = await findUsersHandler([], 'all')
  res.render('dashboard', { users })
})

exports.renderUpdateUser = asyncHandler(async (req, res) => {
  let errors = []
  if (req.query.error && req.query.error === 'invalid-input')
    errors.push('Please fill in username and email.')
  const user = await UserGame.findOne({
    where: {
      uuid: req.params.uuid,
    },
  })

  if (logProps.loggedAs.isAdmin || logProps.loggedAs.uuid === user.uuid) {
    return res.render('update-user', { user, errors })
  }
  return res.redirect('/')
})

exports.updateUserControl = asyncHandler(async (req, res) => {
  const { username, email, full_name, dob, address, contact } = req.body
  const paramsUuid = req.params.uuid

  if (email === '' || email === null || username === '' || username === null) {
    res.redirect(`/users/${paramsUuid}/update?error=invalid-input`)
  }
  await UserGame.update(
    {
      email,
      username,
    },
    {
      where: {
        uuid: paramsUuid,
      },
    }
  )
  await UserGameBiodata.update(
    {
      full_name,
      dob,
      address,
      contact,
    },
    {
      where: {
        user_id: paramsUuid,
      },
    }
  )
  return res.redirect('/dashboard')
})

exports.deleteUserControl = asyncHandler(async (req, res) => {
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
  return res.redirect('/dashboard')
})

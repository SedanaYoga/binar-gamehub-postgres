const asyncHandler = require('express-async-handler')
const { UserGame, UserGameBiodata, setLogProps } = require('../../models')

exports.renderSignUpPage = asyncHandler((req, res) => {
  res.render('sign-in-up', { signType: 'up' })
})

exports.signUpControl = asyncHandler(async (req, res) => {
  if (
    !req.body.username ||
    req.body.username === '' ||
    !req.body.email ||
    req.body.email === '' ||
    !req.body.password ||
    req.body.password === ''
  )
    res.status(400).json({ message: 'Please enter all user data' })

  const { username, email, password, confirmPassword } = req.body
  const isAdmin = req.body.isAdmin ? true : false

  if (password !== confirmPassword) res.send("Password doesn't match!")

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

    setLogProps(true, user.uuid, user.id, user.username, user.isAdmin)
    return res.redirect('/')
  } catch (err) {
    return res.status(400).json(err)
  }
})

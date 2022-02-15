const asyncHandler = require('express-async-handler')
const { UserGame, UserGameBiodata, UserHistory } = require('../../models')
const { getLogProps, setLogProps } = require('../../state/logPropsState.js')
const findUsersHandler = require('../../utils/userHelper.js')
const logProps = getLogProps()

exports.logOutControl = asyncHandler((req, res) => {
  setLogProps(false, '', '', '', false)
  res.redirect('/')
})

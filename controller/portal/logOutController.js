const asyncHandler = require('express-async-handler')
const { setLogProps } = require('../../models')

exports.logOutControl = asyncHandler((req, res) => {
  setLogProps(false, '', '', '', false)
  res.redirect('/')
})

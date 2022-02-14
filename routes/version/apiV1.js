const express = require('express')
const router = express.Router()
const usersApi = require('../usersApi')

router.get('/', (req, res) => {
  res.render('apiPage')
})

router.use('/users', usersApi)

module.exports = router

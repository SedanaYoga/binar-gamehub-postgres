const express = require('express')
const router = express.Router()
const userApi = require('../userApi')
const biodataApi = require('../biodataApi')
const historyApi = require('../historyApi')

router.get('/', (req, res) => {
  res.render('apiPage')
})

router.use('/users', userApi)
router.use('/biodata', biodataApi)
router.use('/history', historyApi)

module.exports = router

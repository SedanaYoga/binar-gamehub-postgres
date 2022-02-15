const express = require('express')
const router = express.Router()
const {
  getAllBiodataApiControl,
  getOneBiodataApiControl,
  updateBiodataApiControl,
} = require('../controller/api/biodataApiController.js')

router.get('/', getAllBiodataApiControl)
router.get('/:uuid', getOneBiodataApiControl)
router.put('/:uuid', updateBiodataApiControl)
module.exports = router

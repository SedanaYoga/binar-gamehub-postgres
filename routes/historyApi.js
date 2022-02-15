const express = require('express')
const router = express.Router()
const {
  getAllHistoryApiControl,
  getOneHistoryApiControl,
  createHistoryApiControl,
  updateHistoryApiControl,
  deleteHistoryApiControl,
} = require('../controller/api/historyApiController.js')

router.get('/', getAllHistoryApiControl)
router.get('/:uuid', getOneHistoryApiControl)
router.post('/', createHistoryApiControl)
router.put('/:uuid', updateHistoryApiControl)
router.delete('/:uuid', deleteHistoryApiControl)
module.exports = router

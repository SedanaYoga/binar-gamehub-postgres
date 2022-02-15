const express = require('express')
const router = express.Router()
const {
  getAllUsersApiControl,
  getOneUserApiControl,
  createUserApiControl,
  updateUserApiControl,
  deleteUserApiControl,
} = require('../controller/api/userApiController.js')

router.get('/', getAllUsersApiControl)
router.get('/:uuid', getOneUserApiControl)
router.post('/', createUserApiControl)
router.put('/:uuid', updateUserApiControl)
router.delete('/:uuid', deleteUserApiControl)
module.exports = router

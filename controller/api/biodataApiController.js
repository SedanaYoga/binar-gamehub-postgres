const asyncHandler = require('express-async-handler')
const { UserGameBiodata } = require('../../models')
const findBiodataHandler = require('../../utils/biodataHelper.js')

exports.getAllBiodataApiControl = asyncHandler(async (req, res) => {
  const biodata = await findBiodataHandler('all')
  return res.json(biodata)
})
exports.getOneBiodataApiControl = asyncHandler(async (req, res) => {
  const paramsUuid = req.params.uuid
  const biodata = await findBiodataHandler('one', paramsUuid)
  res.json(biodata)
})
exports.updateBiodataApiControl = asyncHandler(async (req, res) => {
  const { full_name, dob, address, contact } = req.body
  const paramsUuid = req.params.uuid

  await UserGameBiodata.update(
    {
      full_name,
      dob,
      address,
      contact,
    },
    {
      where: {
        uuid: paramsUuid,
      },
    }
  )
  return res.json({
    full_name,
    dob,
    address,
    contact,
    message: 'Biodata is successfully updated!',
  })
})

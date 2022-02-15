'use strict'
const { UserGameBiodata } = require('../models')

module.exports = async (findMethod = 'all', uuid = '') => {
  try {
    const biodata =
      findMethod === 'all'
        ? await UserGameBiodata.findAll()
        : findMethod === 'one'
        ? await UserGameBiodata.findOne({
            where: {
              uuid,
            },
          })
        : null
    return biodata
  } catch (error) {
    return new Error(error)
  }
}

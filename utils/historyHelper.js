'use strict'
const { UserGameHistory } = require('../models')

module.exports = async (findMethod = 'all', uuid = '') => {
  try {
    const history =
      findMethod === 'all'
        ? await UserGameHistory.findAll()
        : findMethod === 'one'
        ? await UserGameHistory.findOne({
            where: {
              uuid,
            },
          })
        : null
    return history
  } catch (error) {
    return new Error(error)
  }
}

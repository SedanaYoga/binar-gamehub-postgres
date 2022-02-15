'use strict'
const { UserGame } = require('../models')

module.exports = async ([...includeCol], findMethod = 'all', uuid = '') => {
  try {
    const users =
      findMethod === 'all'
        ? await UserGame.findAll({
            include: [...includeCol],
          })
        : findMethod === 'one'
        ? await UserGame.findOne({
            where: {
              uuid,
            },
            include: [...includeCol],
          })
        : null
    return users
  } catch (error) {
    return new Error(error)
  }
}

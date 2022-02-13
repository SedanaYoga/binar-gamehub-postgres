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
    // return res.json(users)
    return users
  } catch (error) {
    console.log(error)
    // return res.status(400).json(error)
    return new Error(error)
  }
}

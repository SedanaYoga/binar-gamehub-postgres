'use strict'
const { Pool } = require('pg/lib')
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserGameHistory, UserGameBiodata }) {
      // define association here
      this.hasMany(UserGameHistory, {
        foreignKey: 'fk_userId_histories',
        as: 'histories',
      })
      this.hasOne(UserGameBiodata, {
        foreignKey: 'fk_userId_biodata',
        as: 'biodata',
      })
    }
    // To Hide the Id value in Sequelize in user facing
    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  UserGame.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'username is required' },
          notEmpty: { msg: 'username must not be empty' },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'email is required' },
          notEmpty: { msg: 'email must not be empty' },
          isEmail: { msg: 'must be a valid email address' },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'password is required' },
          notEmpty: { msg: 'password must not be empty' },
        },
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'user_games',
      modelName: 'UserGame',
    }
  )
  return UserGame
}

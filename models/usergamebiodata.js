'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserGameBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserGame }) {
      // define association here
      // userId
      this.belongsTo(UserGame, {
        foreignKey: {
          name: 'fk_userId_biodata',
          allowNull: false,
        },
        targetKey: 'id',
        as: 'user',
      })
    }
    // To Hide the Id value in Sequelize in user facing
    toJSON() {
      return { ...this.get(), id: undefined, fk_userId_biodata: undefined }
    }
  }
  UserGameBiodata.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      fk_userId_biodata: {
        type: DataTypes.INTEGER,
      },
      user_id: DataTypes.STRING,
      full_name: DataTypes.STRING,
      dob: DataTypes.STRING,
      address: DataTypes.STRING,
      contact: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'user_game_biodata',
      modelName: 'UserGameBiodata',
    }
  )
  return UserGameBiodata
}

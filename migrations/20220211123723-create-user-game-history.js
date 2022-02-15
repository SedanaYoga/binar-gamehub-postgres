'use strict'
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('user_game_histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      fk_userId_histories: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.STRING,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validValue(value) {
          if (value !== 1 || value !== -1 || value !== 0) {
            throw new Error('Only value -1, 0, 1 are allowed')
          }
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('user_game_histories')
  },
}

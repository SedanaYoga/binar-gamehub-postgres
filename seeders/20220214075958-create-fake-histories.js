'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'user_game_histories',
      [
        {
          uuid: '159f5b59-5567-4d46-bc8a-9a3b61600253',
          fk_userId_histories: 1,
          user_id: '3ce17ac5-bc4d-4ce6-9319-6052de92a731',
          score: 1,
          createdAt: '2022-02-14 15:53:18.345+08',
          updatedAt: '2022-02-14 15:53:18.345+08',
        },
        {
          uuid: '159f5b59-5567-4d46-bc8a-9a3b61600254',
          fk_userId_histories: 1,
          user_id: '3ce17ac5-bc4d-4ce6-9319-6052de92a731',
          score: -1,
          createdAt: '2022-02-14 15:53:18.345+08',
          updatedAt: '2022-02-14 15:53:18.345+08',
        },
        {
          uuid: '159f5b59-5567-4d46-bc8a-9a3b61600255',
          fk_userId_histories: 1,
          user_id: '3ce17ac5-bc4d-4ce6-9319-6052de92a731',
          score: 1,
          createdAt: '2022-02-14 15:53:18.345+08',
          updatedAt: '2022-02-14 15:53:18.345+08',
        },
        {
          uuid: '159f5b59-5567-4d46-bc8a-9a3b61600256',
          fk_userId_histories: 2,
          user_id: '9ea5c1f8-69db-4d37-b536-dae5f6828bfc',
          score: 1,
          createdAt: '2022-02-14 15:53:18.345+08',
          updatedAt: '2022-02-14 15:53:18.345+08',
        },
        {
          uuid: '159f5b59-5567-4d46-bc8a-9a3b61600257',
          fk_userId_histories: 2,
          user_id: '9ea5c1f8-69db-4d37-b536-dae5f6828bfc',
          score: 1,
          createdAt: '2022-02-14 15:53:18.345+08',
          updatedAt: '2022-02-14 15:53:18.345+08',
        },
        {
          uuid: '159f5b59-5567-4d46-bc8a-9a3b61600258',
          fk_userId_histories: 2,
          user_id: '9ea5c1f8-69db-4d37-b536-dae5f6828bfc',
          score: 1,
          createdAt: '2022-02-14 15:53:18.345+08',
          updatedAt: '2022-02-14 15:53:18.345+08',
        },
        {
          uuid: '159f5b59-5567-4d46-bc8a-9a3b61600259',
          fk_userId_histories: 2,
          user_id: '9ea5c1f8-69db-4d37-b536-dae5f6828bfc',
          score: 0,
          createdAt: '2022-02-14 15:53:18.345+08',
          updatedAt: '2022-02-14 15:53:18.345+08',
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('user_game_histories', null, {})
  },
}

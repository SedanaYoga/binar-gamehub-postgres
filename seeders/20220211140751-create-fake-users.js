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
      'user_games',
      [
        {
          username: 'admin',
          uuid: '3ce17ac5-bc4d-4ce6-9319-6052de92a731',
          email: 'admin@mail.com',
          password: '123',
          isAdmin: true,
          createdAt: '2022-02-14 15:40:14.491+08',
          updatedAt: '2022-02-14 15:43:35.548+08',
        },
        {
          username: 'nonAdmin',
          uuid: '9ea5c1f8-69db-4d37-b536-dae5f6828bfc',
          email: 'syoga@mail.com',
          password: '123',
          isAdmin: false,
          createdAt: '2022-02-14 15:44:16.82+08',
          updatedAt: '2022-02-14 15:44:16.82+08',
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
    await queryInterface.bulkDelete('user_games', null, {})
  },
}

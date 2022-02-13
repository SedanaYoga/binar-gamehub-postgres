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
          username: 'John Doe',
          uuid: '77df6ec3-b23f-47f9-a19e-1cc0c9d69449',
          email: 'johndoe@mail.com',
          password: '123456',
          createdAt: '2022-02-11T13:14:45.804Z',
          updatedAt: '2022-02-12T13:14:45.804Z',
        },
        {
          username: 'Jane Doe',
          uuid: '5629fb0a-8617-46ce-84b4-378c2a20d11f',
          email: 'janedoe@mail.com',
          password: 'jane1234@',
          createdAt: '2022-02-13T13:14:45.804Z',
          updatedAt: '2022-02-14T13:14:45.804Z',
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

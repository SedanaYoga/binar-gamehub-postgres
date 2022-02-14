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
      'user_game_biodata',
      [
        {
          uuid: '3ac26811-5d6b-4886-a33d-bb25ccb3f307',
          user_id: '3ce17ac5-bc4d-4ce6-9319-6052de92a731',
          fk_userId_biodata: 1,
          full_name: 'System Administrator',
          dob: '1997-01-01',
          address: 'Denpasar, Bali',
          contact: '081761344632',
          createdAt: '2022-02-14 15:40:14.503+08',
          updatedAt: '2022-02-14 15:40:14.503+08',
        },
        {
          uuid: '68d66988-337c-4cc7-a610-ff8279e31474',
          user_id: '9ea5c1f8-69db-4d37-b536-dae5f6828bfc',
          fk_userId_biodata: 2,
          full_name: 'Non Admin Account',
          dob: '1997-01-01',
          address: 'Denpasar, Bali',
          contact: '081761344632',
          createdAt: '2022-02-14 15:44:16.831+08',
          updatedAt: '2022-02-14 15:44:16.831+08',
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
  },
}

"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
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
         "tasktypes",
         [
            {
               nameType: "Hẹn Gặp",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               nameType: "Bảo Hành",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               nameType: "Gọi Điện",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      /**
       * Add commands to revert seed here.
       *
       * Example:
       * await queryInterface.bulkDelete('People', null, {});
       */
   },
};

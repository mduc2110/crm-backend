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
         "People",
         [
            {
               username: "ADMIN",
               password: "AKJSDFHIQW1243",
               email: "",
               active: true,
               phone: "0932174169",
               name: "ADMIN",
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
      await queryInterface.bulkDelete("users", null, {});
   },
};

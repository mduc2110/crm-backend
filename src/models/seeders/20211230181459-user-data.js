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
         "users",
         [
            {
               username: "ADMIN",
               password: "$2b$10$i2KA9wRJeRmPvDSZIduvROzKnVU3WugOD/p7LRkzVQa5CgXGsK932",
               email: "",
               active: true,
               phone: "0932174169",
               name: "ADMIN",
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
      await queryInterface.bulkDelete("users", null, {});
   },
};

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
         "customerstatuses",
         [
            {
               status: "Khách hàng tiềm năng",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               status: "Khách hàng mới",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               status: "Khách hàng quan tâm",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
         ],
         {}
      );

      await queryInterface.bulkInsert(
         "customertags",
         [
            {
               tagName: "Khách hàng mới",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               tagName: "Khách hàng thân thiết",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               tagName: "Khách hàng lâu năm",
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

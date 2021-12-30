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
         "roles",
         [
            {
               roleName: "ADMIN",
               description: "Quản trị viên",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               roleName: "SALE_MANAGER",
               description: "Trưởng phòng Sale",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               roleName: "MKT_MANAGER",
               description: "Trưởng phòng Marketing",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               roleName: "MKT_EMP",
               description: "Nhân viên Marketing",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               roleName: "CRM_MANAGER",
               description: "Trưởng phòng CSKH",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               roleName: "CRM_EMP",
               description: "Nhân viên CSKH",
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
      await queryInterface.bulkDelete("roles", null, {});
   },
};

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

      /*
         role:
         ADMIN: 1
         SAKE_MANAGEr: 2
         MKT_MANAGER: 3
         MKT_EMP: 4
         CRM_MANAGER: 5
         CRM_EMP: 6

         permission:
         READ_USER: 1
         WRITE_USER: 2
         READ_CUSTOMER: 3
         WRITE_CUSTOMER: 4
         READ_CAMPAIN: 5
         WRITE_CAMPAIN: 6
      
      */
      await queryInterface.bulkInsert(
         "asso_role_permissions",
         [
            {
               permissionId: 5,
               roleId: 5,
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               permissionId: 5,
               roleId: 6,
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               permissionId: 6,
               roleId: 5,
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

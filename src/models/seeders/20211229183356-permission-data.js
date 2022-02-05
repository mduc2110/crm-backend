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
         "permissions",
         [
            {
               permissionName: "READ_USER",
               description: "Đọc thông tin của Người dùng",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               permissionName: "WRITE_USER",
               description: "Chỉnh sửa thông tin của Người dùng",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               permissionName: "READ_CUSTOMER",
               description: "Đọc thông tin của Khách hàng",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               permissionName: "WRITE_CUSTOMER",
               description: "Chỉnh sửa thông tin của Khách hàng",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               permissionName: "READ_CAMPAIN",
               description: "Đọc thông tin của Chiến dịch",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               permissionName: "WRITE_CAMPAIN",
               description: "Chỉnh sửa thông tin của Chiến dịch",
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
      await queryInterface.bulkDelete("permissions", null, {});

      // await queryInterface.bulkDelete(
      //    "permissions",
      //    {
      //       where: {
      //          [Op.or]: [
      //             { permissionName: "READ_USER" },
      //             { permissionName: "WRITE_USER" },
      //             { permissionName: "READ_CUSTOMER" },
      //             { permissionName: "WRITE_CUSTOMER" },
      //             { permissionName: "READ_CAMPAIN" },
      //             { permissionName: "WRITE_CAMPAIN" },
      //          ],
      //       },
      //    },
      //    {}
      // );
   },
};

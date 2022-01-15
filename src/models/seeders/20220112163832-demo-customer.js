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
         "customers",
         [
            {
               customerName: "Vũ Mạnh Đức",
               phone: "0932174160",
               email: "vmd211099@gmail.com",
               birthday: new Date(1999, 10, 21),
               gender: "MALE",
               personalID: "025842575",
               // idAddress : " int ",
               // idTag : " int ",
               // idType : " int ",
               // idStatus : " int ",
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
      await queryInterface.bulkDelete("People", null, {});
   },
};

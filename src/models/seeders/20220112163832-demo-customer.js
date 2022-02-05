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
               phone: "0932174169",
               email: "vmd211099@gmail.com",
               birthday: "1999-10-21",
               gender: "Nam",
               personalID: "025842575",
               idStatus: "1",
               idTag: "1",
               idProvince: "thanh-pho-ho-chi-minh",
               idDistrict: "quan-binh-tan",
               idWard: "27439-0001",
               detailAddress: "15 Đường số 4",
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

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
         "addresses",
         [
            {
               idProvince: "thanh-pho-ho-chi-minh",
               idDistrict: "quan-tan-binh",
               idWard: "26989-0001",
               detailAddress: "686/100 Cách Mạng Tháng 8",
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

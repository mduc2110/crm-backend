"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      /**
       * Add altering commands here.
       *
       * Example:
       * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
       */
      // await queryInterface.removeColumn("customers", "addressId", {
      //    /* query options */
      // });
      // await queryInterface.addColumn("customers", "idProvince", {
      //    type: Sequelize.STRING,
      // });
      // await queryInterface.addColumn("customers", "idDistrict", {
      //    type: Sequelize.STRING,
      // });
      // await queryInterface.addColumn("customers", "idWard", {
      //    type: Sequelize.STRING,
      // });
      // await queryInterface.addColumn("customers", "detailAddress", {
      //    type: Sequelize.STRING,
      // });
   },

   down: async (queryInterface, Sequelize) => {
      /**
       * Add reverting commands here.
       *
       * Example:
       * await queryInterface.dropTable('users');
       */
      // await queryInterface.dropTable("customer");
      await queryInterface.removeColumn("customers", "idProvince");
      await queryInterface.removeColumn("customers", "idDistrict");
      await queryInterface.removeColumn("customers", "idWard");
      await queryInterface.removeColumn("customers", "detailAddress");
   },
};

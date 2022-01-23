"use strict";
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("customers", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         customerName: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         phone: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         email: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         birthday: {
            type: Sequelize.DATE,
         },
         gender: {
            type: Sequelize.ENUM(["Nam", "Nữ", "Khác"]),
         },
         personalID: {
            type: Sequelize.STRING,
         },
         idTag: {
            type: Sequelize.INTEGER,
            references: {
               // model: {
               //    tableName: "customertags",
               //    schema: "crm_db",
               // },
               model: "customertags",
               key: "id",
            },
            allowNull: false,
         },
         idStatus: {
            type: Sequelize.INTEGER,
            references: {
               // model: {
               //    tableName: "customerstatus",
               //    schema: "crm_db",
               // },
               model: "customerstatuses",
               key: "id",
            },
         },
         addressId: {
            type: Sequelize.STRING,
         },
         idProvince: {
            type: Sequelize.STRING,
         },
         idDistrict: {
            type: Sequelize.STRING,
         },
         idWard: {
            type: Sequelize.STRING,
         },
         detailAddress: {
            type: Sequelize.STRING,
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
      });
   },
   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("customers");
   },
};

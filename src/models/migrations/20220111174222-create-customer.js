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
         },
         phone: {
            type: Sequelize.STRING,
         },
         email: {
            type: Sequelize.STRING,
         },
         birthday: {
            type: Sequelize.DATE,
         },
         gender: {
            // type: Sequelize.ENUM("MALE", "FEMALE", "OTHER"),
            type: Sequelize.ENUM(["MALE", "FEMALE", "OTHER"]),
         },
         personalID: {
            type: Sequelize.STRING,
         },
         idAddress: {
            type: Sequelize.INTEGER,
            references: {
               // model: {
               //    tableName: "addresses",
               //    schema: "crm_db",
               // },
               model: "addresses",
               key: "id",
            },
            allowNull: false,
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

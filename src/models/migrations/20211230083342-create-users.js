"use strict";
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("users", {
         // id: {
         //   allowNull: false,
         //   autoIncrement: true,
         //   primaryKey: true,
         //   type: Sequelize.INTEGER
         // },
         username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
         },
         password: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         email: {
            type: Sequelize.STRING,
            isEmail: true,
            allowNull: false,
         },
         active: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
            defaultValue: true,
         },
         phone: {
            type: Sequelize.STRING,
         },
         name: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         roleId: {
            type: Sequelize.INTEGER,
            references: { model: "roles", key: "id" },
         },
      });
   },
   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("users");
   },
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class customer extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         customer.belongsTo(models.customerStatus, {
            // foreignKey: "roleId",
            foreignKey: {
               field: "idStatus",
               allowNull: false,
            },
         });
         customer.belongsTo(models.customerTag, {
            // foreignKey: "roleId",
            foreignKey: {
               field: "idTag",
               allowNull: false,
            },
         });
         customer.belongsTo(models.address, {
            // foreignKey: "roleId",
            foreignKey: {
               field: "idAddress",
               allowNull: false,
            },
         });
      }
   }
   customer.init(
      {
         customerName: DataTypes.STRING,
         phone: DataTypes.STRING,
         email: DataTypes.STRING,
         birthday: DataTypes.DATE,
         gender: DataTypes.ENUM("MALE", "FEMALE", "OTHER"),
         personalID: DataTypes.STRING,
         // idAddress: DataTypes.INTEGER,
         // idTag: DataTypes.INTEGER,
         // idType: DataTypes.INTEGER,
         // idStatus: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: "customer",
      }
   );
   return customer;
};

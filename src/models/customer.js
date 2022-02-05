"use strict";
import moment from "moment";
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

         customer.hasMany(models.tasks);
      }
      getBirthday() {
         return moment(this.birthday).format("DD MM YYYY");
      }
   }
   customer.init(
      {
         customerName: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         phone: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         email: {
            type: DataTypes.STRING,
            validate: {
               isEmail: true,
            },
            allowNull: false,
         },
         birthday: DataTypes.DATEONLY,
         gender: DataTypes.ENUM("Nam", "Nữ", "Khác"),
         personalID: DataTypes.STRING,
         idProvince: DataTypes.STRING,
         idDistrict: DataTypes.STRING,
         idWard: DataTypes.STRING,
         detailAddress: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "customer",
      }
   );
   return customer;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class customerstatus extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         customerstatus.hasMany(models.customer);
      }
   }
   customerstatus.init(
      {
         status: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "customerstatus",
      }
   );
   return customerstatus;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class customerStatus extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         customerStatus.hasMany(models.customer);
      }
   }
   customerStatus.init(
      {
         status: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "customerStatus",
      }
   );
   return customerStatus;
};

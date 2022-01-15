"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class customerTag extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         customerTag.hasMany(models.customer);
      }
   }
   customerTag.init(
      {
         tagName: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "customerTag",
      }
   );
   return customerTag;
};

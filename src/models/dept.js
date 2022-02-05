"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class depts extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         depts.hasMany(models.users);
      }
   }
   depts.init(
      {
         departmentName: {
            type: DataTypes.STRING,
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: "depts",
      }
   );
   return depts;
};

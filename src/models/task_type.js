"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class tasktypes extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         // tasktypes.belongsToMany(models.tasks);
         tasktypes.hasMany(models.tasks);
      }
   }
   tasktypes.init(
      {
         nameType: {
            type: DataTypes.STRING,
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: "tasktypes",
      }
   );
   return tasktypes;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class taskTypes extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         // taskTypes.belongsToMany(models.tasks);
         taskTypes.hasMany(models.tasks);
      }
   }
   taskTypes.init(
      {
         nameType: {
            type: DataTypes.STRING,
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: "taskTypes",
      }
   );
   return taskTypes;
};

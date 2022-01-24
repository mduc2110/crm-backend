"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class tasks extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here

         tasks.belongsTo(models.users, {
            foreignKey: {
               field: "userId",
               allowNull: false,
            },
         });
         tasks.belongsTo(models.taskTypes, {
            foreignKey: {
               field: "taskTypeId",
               allowNull: false,
            },
         });
         tasks.belongsTo(models.customer, {
            foreignKey: {
               field: "customerId",
               allowNull: false,
            },
         });
      }
   }
   tasks.init(
      {
         taskName: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         taskDescription: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         startTime: {
            type: DataTypes.DATE,
            allowNull: false,
         },
         endTime: {
            type: DataTypes.DATE,
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: "tasks",
      }
   );
   return tasks;
};

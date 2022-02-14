"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class users extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         users.belongsTo(models.roles, {
            // foreignKey: "roleId",
            foreignKey: {
               field: "roleId",
               allowNull: false,
            },
         });

         users.belongsTo(models.depts, {
            // foreignKey: "roleId",
            foreignKey: {
               field: "deptId",
               allowNull: false,
            },
         });

         users.hasMany(models.tasks);
         users.hasMany(models.campaigns);
      }
   }
   users.init(
      {
         username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
         },
         password: DataTypes.STRING,
         email: DataTypes.STRING,
         active: DataTypes.BOOLEAN,
         phone: DataTypes.STRING,
         name: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "users",
      }
   );
   return users;
};

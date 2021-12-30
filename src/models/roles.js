"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class roles extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here

         roles.hasOne(models.users);

         roles.belongsToMany(models.permissions, {
            through: "asso_role_permissions",
         });
      }
   }
   roles.init(
      {
         roleName: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         description: {
            type: DataTypes.STRING,
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: "roles",
      }
   );
   return roles;
};

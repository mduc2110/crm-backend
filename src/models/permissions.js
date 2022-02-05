"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class permissions extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         permissions.belongsToMany(models.roles, {
            through: "asso_role_permissions",
         });
      }
   }
   permissions.init(
      {
         permissionName: {
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
         modelName: "permissions",
      }
   );
   return permissions;
};

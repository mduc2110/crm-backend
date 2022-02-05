module.exports = (sequelize, DataTypes) => {
   const rolePermission = sequelize.define("asso_role_permissions", {
      permissionId: {
         primaryKey: true,
         allowNull: false,
         type: DataTypes.INTEGER,
         references: {
            model: {
               tableName: "permissions",
            },
            key: "id",
         },
         allowNull: false,
      },
      roleId: {
         primaryKey: true,
         allowNull: false,
         type: DataTypes.INTEGER,
         references: {
            model: {
               tableName: "roles",
            },
            key: "id",
         },
         allowNull: false,
      },
      createdAt: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW,
      },
      updatedAt: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW,
      },
   });
   return rolePermission;
};

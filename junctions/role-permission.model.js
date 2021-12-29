// import Role from "../role.model";
// import Permission from "../permission.model";

export default (Role, Permission, sequelize, Sequelize) => {
   const Role_Permission = sequelize.define(
      "Role_Permissions",
      {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         selfGranted: Sequelize.BOOLEAN,
      },
      { timestamps: false }
   );
   Role.belongsToMany(Permission, { through: Role_Permission });
   Permission.belongsToMany(Role, { through: Role_Permission });

   // return Role_Permission;
};

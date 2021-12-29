import { Sequelize } from "sequelize";
import { dbConfig } from "../config/db.config";

import UserModel from "./user.model";
import RoleModel from "./role.model";
import PermissionModel from "./permission.model";
import RolePermissionModel from "./junctions/role-permission.model";

const sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.USER, dbConfig.PASSWORD, {
   host: dbConfig.HOST,
   dialect: dbConfig.DIALECT,
   operatorsAliases: false,
   port: 3306,
   pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
   },
   logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = UserModel(sequelize, Sequelize);

const Role = RoleModel(sequelize, Sequelize);
db.Role = Role;

const Permission = PermissionModel(sequelize, Sequelize);
db.Permission = Permission;

RolePermissionModel(Role, Permission, sequelize, Sequelize);

// const Role = sequelize.define("role", {
//    id: {
//       primaryKey: true,
//       type: Sequelize.UUID,
//       defaultValue: Sequelize.UUID1,
//       validate: {
//          notEmpty: true,
//       },
//    },
//    name: {
//       type: Sequelize.STRING(100),
//       allowNull: false,
//       validate: {
//          notEmpty: true,
//       },
//    },
//    description: {
//       type: Sequelize.STRING(100),
//       allowNull: false,
//       validate: {
//          notEmpty: true,
//       },
//    },
// });

// const Permission = sequelize.define("permission", {
//    id: {
//       primaryKey: true,
//       type: Sequelize.UUID,
//       defaultValue: Sequelize.UUIDV1,
//       validate: {
//          notEmpty: true,
//       },
//    },
//    name: {
//       type: Sequelize.STRING(100),
//       allowNull: false,
//       validate: {
//          notEmpty: true,
//       },
//    },
// });

// const Role_Permission = sequelize.define(
//    "Role_Permission",
//    {
//       id: {
//          type: Sequelize.INTEGER,
//          primaryKey: true,
//          autoIncrement: true,
//          allowNull: false,
//       },
//       selfGranted: Sequelize.BOOLEAN,
//    },
//    { timestamps: false }
// );
// Role.belongsToMany(Permission, { through: Role_Permission });
// Permission.belongsToMany(Role, { through: Role_Permission });

export default db;

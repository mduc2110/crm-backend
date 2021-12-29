import Role from "./role.model";

export default (sequelize, Sequelize) => {
   const User = sequelize.define("user", {
      id: {
         primaryKey: true,
         type: Sequelize.UUID,
         defaultValue: Sequelize.UUIDV1,
         validate: {
            notEmpty: true,
         },
      },
      username: {
         type: Sequelize.STRING,
         allowNull: false,
         unique: true,
         validate: {
            notEmpty: true,
         },
      },
      password: {
         type: Sequelize.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      active: {
         type: Sequelize.BOOLEAN,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
         defaultValue: true,
      },
      email: {
         type: Sequelize.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
            isEmail: true,
         },
      },
      name: {
         type: Sequelize.STRING(100),
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      roleId: {
         type: Sequelize.UUID,
         references: {
            model: "roles", // 'Actors' would also work
            key: "id",
         },
      },
   });

   return User;
};

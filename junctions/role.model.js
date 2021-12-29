export default (sequelize, Sequelize) => {
   const Role = sequelize.define("roles", {
      id: {
         primaryKey: true,
         type: Sequelize.UUID,
         defaultValue: Sequelize.UUIDV1,
         validate: {
            notEmpty: true,
         },
      },
      name: {
         type: Sequelize.STRING(100),
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      description: {
         type: Sequelize.STRING(100),
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
   });
   return Role;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class emails extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         emails.belongsTo(models.campaigns, {
            foreignKey: {
               field: "campaignId",
               allowNull: true,
            },
         });
         // define association here
      }
   }
   emails.init(
      {
         smtp_id: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         sg_message_id: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         event: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         email: {
            type: DataTypes.STRING,
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: "emails",
      }
   );
   return emails;
};

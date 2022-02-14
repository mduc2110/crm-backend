"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class campaigns extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         campaigns.belongsTo(models.users, {
            foreignKey: {
               field: "userId",
               allowNull: false,
            },
         });

         campaigns.hasMany(models.emails);
      }
      // getBirthday() {
      //    return moment(this.birthday).format("DD MM YYYY");
      // }
   }
   campaigns.init(
      {
         title: {
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
         modelName: "campaigns",
      }
   );
   return campaigns;
};

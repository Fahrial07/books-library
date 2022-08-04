'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Members.hasMany(models.BookBorrowing, {
        foreignKey: 'member_code',
         sourceKey: 'code',
        as: 'book_borrowing',
         type: DataTypes.STRING
      });
    }
  }
  Members.init({
    code: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Members',
  });
  return Members;
};
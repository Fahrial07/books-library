'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookBorrowing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookBorrowing.belongsTo(models.Members, {
        foreignKey: 'member_code',
        targetKey: 'code',
        as: 'members',
        type: DataTypes.STRING
      });

      BookBorrowing.belongsTo(models.Books, {
        foreignKey: 'book_code',
         targetKey: 'code',
        as: 'books',
        type: DataTypes.STRING
      })
    }
  }
  BookBorrowing.init({
    member_code: DataTypes.STRING,
    book_code: DataTypes.STRING,
    start_date: DataTypes.STRING,
    end_date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BookBorrowing',
  });
  return BookBorrowing;
};
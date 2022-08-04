'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Books.hasMany(models.BookBorrowing, {
        foreignKey: 'book_code',
        sourceKey: 'code',
        as: 'book_borrowing',
        type: DataTypes.STRING
      })
    }
  }
  Books.init({
    code: DataTypes.STRING,
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Books',
  });
  return Books;
};
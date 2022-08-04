'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pinalty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pinalty.init({
    member_code: DataTypes.STRING,
    start_date: DataTypes.STRING,
    end_date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pinalty',
  });
  return Pinalty;
};
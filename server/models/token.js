'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Token.init({
    token: DataTypes.STRING(2000),
    name: DataTypes.STRING(100)
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Entity.init({
    nipc: {
      type: DataTypes.STRING(9),
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    },
    telemovel: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Entity',
    timestamps: true,
  });
  return Entity;
};

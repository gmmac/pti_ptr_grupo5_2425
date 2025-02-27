'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    static associate(models) {
    }
  }
  Store.init({
    nipc: {
      type: DataTypes.STRING(9),
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    openTime: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    closeTime: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    latitude: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    longitude: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Store',
    timestamps: true,
  });
  return Store;
};

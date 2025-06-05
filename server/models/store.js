'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    static associate(models) {

      Store.hasMany(models.UsedEquipment, {
        foreignKey: 'storeId',
        as: 'usedEquipments',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Store.hasMany(models.Employee, {
        foreignKey: 'storeNIPC',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

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
      allowNull: true,
      unique: true
    },
    openTime: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    closeTime: {
      type: DataTypes.STRING(5),
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
    },
    isActive: {
      type: DataTypes.STRING(1),
    },
  }, {
    sequelize,
    modelName: 'Store',
    timestamps: true,
  });
  return Store;
};

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    static associate(models) {
      Warehouse.hasMany(models.CharityProject, { foreignKey: 'warehouseID' });
    }
  }
  Warehouse.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    totalSlots: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    availableSlots: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isActive: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    sequelize,
    modelName: 'Warehouse',
    timestamps: true
  });
  return Warehouse;
};
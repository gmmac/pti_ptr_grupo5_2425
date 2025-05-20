'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EquipmentStatus extends Model {
    static associate(models) {
      EquipmentStatus.hasMany(models.UsedEquipment, {
        foreignKey: 'statusID',
        sourceKey: 'id'
      });
    }
  }
  EquipmentStatus.init({
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    isActive: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    sequelize,
    modelName: 'EquipmentStatus',
    timestamps: true
  });
  return EquipmentStatus;
};
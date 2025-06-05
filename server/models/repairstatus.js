'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RepairStatus extends Model {
    static associate(models) {
      // define association here (e.g., RepairStatusLog)
    }
  }
  RepairStatus.init({
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    isActive: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '1'
    },
    protected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'RepairStatus',
    timestamps: true,
  });
  return RepairStatus;
};
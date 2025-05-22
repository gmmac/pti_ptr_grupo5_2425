'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reportType extends Model {

    static associate(models) {
    }
  }

  reportType.init({
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      isActive: {
        type: DataTypes.STRING(1),
        allowNull: false,
        defaultValue: '1'
      }
  }, {
    sequelize,
    modelName: 'ReportType',
  });
  return reportType;
};
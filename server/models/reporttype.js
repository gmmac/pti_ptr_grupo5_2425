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
      },
        protected: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
  }, {
    sequelize,
    modelName: 'ReportType',
    hooks: {
      beforeDestroy: (instance, options) => {
        if (instance.protected) {
          throw new Error(`Report type "${instance.name}" is protected and cannot be deleted.`);
        }
      }
    }
  });
  return reportType;
};
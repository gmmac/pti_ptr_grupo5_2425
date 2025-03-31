'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EmployeeRole extends Model {
    static associate(models) {
      // define association here
    }
  }

  EmployeeRole.init({
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    protected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'EmployeeRole',
    hooks: {
      beforeDestroy: (instance, options) => {
        if (instance.protected) {
          throw new Error(`Role "${instance.role}" is protected and cannot be deleted.`);
        }
      }
    }
  });

  return EmployeeRole;
};

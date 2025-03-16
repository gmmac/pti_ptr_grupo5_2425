'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeRole extends Model {
    static associate(models) {
    }
  }
  EmployeeRole.init({
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'EmployeeRole',
    timestamps: true,
  });
  return EmployeeRole;
};

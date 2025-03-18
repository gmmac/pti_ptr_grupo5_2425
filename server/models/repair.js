'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Repair extends Model {
    static associate(models) {
      Repair.belongsTo(models.RepairStatus, {
        foreignKey: 'statusID',
        targetKey: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });

      Repair.belongsTo(models.Employee, {
        foreignKey: 'employeeId',
        targetKey: 'nic',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }
  }
  Repair.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    statusID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    budget: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    completionDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    employeeId: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Repair',
    timestamps: true,
  });
  return Repair;
};

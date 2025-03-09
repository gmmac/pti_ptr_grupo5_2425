'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.belongsTo(models.EmployeeRole, {
        foreignKey: 'role',
        targetKey: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });

      Employee.belongsTo(models.Store, {
        foreignKey: 'storeNIPC',
        targetKey: 'nipc',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }
  }
  Employee.init({
    nic: {
      type: DataTypes.STRING(9),
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    },
    nif: {
      type: DataTypes.STRING(9),
      unique: true,
      allowNull: true
    },
    internNum: {
      type: DataTypes.STRING(6),
      unique: true,
      allowNull: true
    },
    storeNIPC: {
      type: DataTypes.STRING(9),
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(100),
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
    role: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Employee',
    timestamps: true,
  });
  return Employee;
};

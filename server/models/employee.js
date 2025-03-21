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
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      autoIncrement: true
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
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    lastName: {
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
    },
    passwordReseted: {
      type: DataTypes.STRING(1),
    },
    
  }, {
    sequelize,
    modelName: 'Employee',
    timestamps: true,
  });
  return Employee;
};

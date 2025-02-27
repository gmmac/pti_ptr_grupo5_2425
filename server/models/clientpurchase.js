'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClientPurchase extends Model {
    static associate(models) {
      ClientPurchase.belongsTo(models.Client, {
        foreignKey: 'clientNIC',
        targetKey: 'nic',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });

      ClientPurchase.belongsTo(models.Employee, {
        foreignKey: 'employeeID',
        targetKey: 'nic',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }
  }
  ClientPurchase.init({
    clientNIC: {
      type: DataTypes.STRING(9),
      allowNull: false
    },
    employeeID: {
      type: DataTypes.STRING(9),
      allowNull: false
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'ClientPurchase',
    timestamps: true,
  });
  return ClientPurchase;
};

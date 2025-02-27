'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StorePurchase extends Model {
    static associate(models) {
      StorePurchase.belongsTo(models.Store, {
        foreignKey: 'storeID',
        targetKey: 'nipc',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });

      StorePurchase.belongsTo(models.Client, {
        foreignKey: 'clientNIC',
        targetKey: 'nic',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });

      StorePurchase.belongsTo(models.Employee, {
        foreignKey: 'employeeID',
        targetKey: 'nic',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });

      StorePurchase.belongsTo(models.UsedEquipment, {
        foreignKey: 'usedEquipmentID',
        targetKey: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }
  }
  StorePurchase.init({
    storeID: {
      type: DataTypes.STRING(9),
      allowNull: false
    },
    clientNIC: {
      type: DataTypes.STRING(9),
      allowNull: false
    },
    employeeID: {
      type: DataTypes.STRING(9),
      allowNull: false
    },
    purchasePrice: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    usedEquipmentID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'StorePurchase',
    timestamps: true,
  });
  return StorePurchase;
};

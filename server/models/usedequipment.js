'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsedEquipment extends Model {
    static associate(models) {
      UsedEquipment.belongsTo(models.EquipmentStatus, {
        foreignKey: 'statusID',
        targetKey: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });

      UsedEquipment.belongsTo(models.EquipmentSheet, {
        foreignKey: 'equipmentId',
        targetKey: 'barcode',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });

      UsedEquipment.belongsTo(models.Store, {
        foreignKey: 'storeId',
        targetKey: 'nipc',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }
  }
  UsedEquipment.init({
    statusID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    saleDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    equipmentId: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UsedEquipment',
    timestamps: true,
  });
  return UsedEquipment;
};

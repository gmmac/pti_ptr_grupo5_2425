'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseCartEquipment extends Model {
    static associate(models) {

      PurchaseCartEquipment.belongsTo(models.UsedEquipment, 
        { foreignKey: 'equipmentId',
          targetKey: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        });

      PurchaseCartEquipment.belongsTo(models.ClientPurchase, 
        { foreignKey: 'clientPurchaseId',
          targetKey: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        });
    }
  }
  PurchaseCartEquipment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      equipmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      clientPurchaseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'PurchaseCartEquipment',
      timestamps: true,
    });
  return PurchaseCartEquipment;
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.Client, {
        foreignKey: 'clientNIC',
        targetKey: 'nic',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });

      Cart.belongsTo(models.ClientPurchase, {
        foreignKey: 'clientPurchaseID',
        targetKey: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });

      Cart.belongsTo(models.UsedEquipment, {
        foreignKey: 'usedEquipmentID',
        targetKey: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }
  }
  Cart.init({
    clientNIC: {
      type: DataTypes.STRING(9),
      allowNull: false
    },
    clientPurchaseID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    usedEquipmentID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Cart',
    timestamps: true,
  });
  return Cart;
};

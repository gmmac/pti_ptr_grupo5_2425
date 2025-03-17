'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActualCartEquipment extends Model {
    static associate(models) {

      ActualCartEquipment.belongsTo(models.UsedEquipment, 
        { foreignKey: 'equipmentId',
          targetKey: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'SET NULL'
         });

      ActualCartEquipment.belongsTo(models.ActualCart, 
        { foreignKey: 'cartId',
          targetKey: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'SET NULL'
        });
    }
  }
  ActualCartEquipment.init(
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
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'ActualCartEquipment',
      timestamps: true,
    });
  return ActualCartEquipment;
};
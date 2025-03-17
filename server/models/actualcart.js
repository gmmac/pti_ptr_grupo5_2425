'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ActualCart extends Model {
    static associate(models) {
      ActualCart.belongsTo(models.Client, 
        { foreignKey: 'clientNIC',
          targetKey: 'nic',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
         });
    }
  }
  ActualCart.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      clientNIC: {
        type: DataTypes.STRING(9),
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'ActualCart',
      timestamps: true,
    });
  return ActualCart;
};




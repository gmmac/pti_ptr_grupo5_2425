'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RepairParts extends Model {
    static associate(models) {
      RepairParts.belongsTo(models.Repair, {
        foreignKey: "repairID",
        targetKey: "id",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });

      RepairParts.belongsTo(models.Part, {
        foreignKey: "partID",
        targetKey: "id",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }
  }
  RepairParts.init(
    {
      repairID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      partID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      arrivalDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      active: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  }, {
    sequelize,
    modelName: 'RepairParts',
  });
  return RepairParts;
};
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RepairStatusLog extends Model {
    static associate(models) {
      RepairStatusLog.belongsTo(models.RepairStatus, {
        foreignKey: "statusId",
        targetKey: "id",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
      
      RepairStatusLog.belongsTo(models.Repair, {
        foreignKey: "repairId",
        targetKey: "id",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }
  }

  RepairStatusLog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      repairId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
    }
  );

  return RepairStatusLog;
};
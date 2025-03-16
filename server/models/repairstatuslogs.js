"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RepairStatusLogs extends Model {
    static associate(models) {
      RepairStatusLogs.belongsTo(models.RepairStatus, {
        foreignKey: "statusId",
        targetKey: "id",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
      RepairStatusLogs.belongsTo(models.Repair, {
        foreignKey: "repairId",
        targetKey: "id",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }
  }
  RepairStatusLogs.init(
    {
      statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      repairId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "RepairStatusLogs",
      timestamps: true,
    }
  );
  return RepairStatusLogs;
};

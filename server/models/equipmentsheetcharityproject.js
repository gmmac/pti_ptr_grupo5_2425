'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EquipmentSheetCharityProject extends Model {
    static associate(models) {
      EquipmentSheetCharityProject.belongsTo(models.UsedEquipment, {
        foreignKey: 'equipmentSheetId',
      });

      EquipmentSheetCharityProject.belongsTo(models.CharityProject, {
        foreignKey: 'charityProjectId',
      });
    }
  }

  EquipmentSheetCharityProject.init({
    equipmentSheetId: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
    },
    charityProjectId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    quantity:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'EquipmentSheetCharityProject',
    timestamps: true,
  });

  return EquipmentSheetCharityProject;
};

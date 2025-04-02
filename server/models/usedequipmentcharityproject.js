'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UsedEquipmentCharityProject extends Model {
    static associate(models) {
      UsedEquipmentCharityProject.belongsTo(models.UsedEquipment, {
        foreignKey: 'usedEquipmentId',
      });

      UsedEquipmentCharityProject.belongsTo(models.CharityProject, {
        foreignKey: 'charityProjectId',
      });
    }
  }

  UsedEquipmentCharityProject.init({
    usedEquipmentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    charityProjectId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'UsedEquipmentCharityProject',
    timestamps: true,
  });

  return UsedEquipmentCharityProject;
};

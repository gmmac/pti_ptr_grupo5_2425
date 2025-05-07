'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CharityProjectDonations extends Model {
    static associate(models) {
      CharityProjectDonations.belongsTo(models.CharityProject, {
        foreignKey: 'charityProjectId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      CharityProjectDonations.belongsTo(models.UsedEquipment, {
        foreignKey: 'usedEquipmentId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }

  CharityProjectDonations.init({
    charityProjectId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    usedEquipmentId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'CharityProjectDonations',
    timestamps: true
  });

  return CharityProjectDonations;
};

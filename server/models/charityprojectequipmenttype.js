'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CharityProjectEquipmentType extends Model {
    static associate(models) {
      CharityProjectEquipmentType.belongsTo(models.CharityProject, {
        foreignKey: 'charityProjectId',
      });

      CharityProjectEquipmentType.belongsTo(models.EquipmentType, {
        foreignKey: 'equipmentTypeId',
      });
    }
  }

  CharityProjectEquipmentType.init({
    charityProjectId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    equipmentTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CharityProjectEquipmentType',
    timestamps: true
  });

  return CharityProjectEquipmentType;
};

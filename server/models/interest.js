'use strict';
const { 
    Model 
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Interest extends Model {
    static associate(models) {
      
      Interest.belongsTo(models.EquipmentSheet, {
        foreignKey: 'equipmentSheetID',
        as: 'equipmentSheet',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      
      Interest.belongsTo(models.FolderInterest, {
        foreignKey: 'folderInterestID',
        as: 'folderInterest',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

    }
  }
  
  Interest.init(
    {
      equipmentSheetID: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      folderInterestID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Interest',
      timestamps: true,
    }
  );
  return Interest;
};

'use strict';
const { 
    Model 
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FolderInterest extends Model {
    static associate(models) {
      FolderInterest.hasMany(models.Interest, { // Uma FolderInterest pode ter muitos Interests
        foreignKey: 'folderInterestID',
        as: 'interests',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  
  FolderInterest.init(
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      clientNIC: {
        type: DataTypes.STRING(9),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'FolderInterest',
      timestamps: true,
    }
  );
  return FolderInterest;
};
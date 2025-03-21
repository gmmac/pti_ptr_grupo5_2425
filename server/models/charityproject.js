'use strict';
const { Model } = require('sequelize');  // Correctly import Model from Sequelize
module.exports = (sequelize, DataTypes) => {
  class CharityProject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CharityProject.belongsTo(models.Organizer, {
        foreignKey: 'organizerNic',
        targetKey: 'nic',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
      
      CharityProject.belongsTo(models.ProjectStatus, {
        foreignKey: 'status',
        targetKey: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
      
      CharityProject.belongsTo(models.Warehouse, {
        foreignKey: 'warehouseID',
        targetKey: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
      
      CharityProject.belongsToMany(models.UsedEquipment, {
        through: models.UsedEquipmentCharityProject,
        foreignKey: 'charityProjectId',
        otherKey: 'usedEquipmentId'
      });
      
      }
  }

  CharityProject.init({
    startDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    completionDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    organizerNic: {
      type: DataTypes.STRING(9),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    warehouseID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalSpace: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'CharityProject',
    timestamps: true,
  });

  return CharityProject;
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Warehouse.hasMany(models.CharityProject, {
        foreignKey: 'warehouseID',
      });
      
    }
  }
  Warehouse.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    totalSlots: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    availableSlots: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Warehouse',
    timestamps: true,
  });
  return Warehouse;
};

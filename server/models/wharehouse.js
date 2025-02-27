'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wharehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wharehouse.init({
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
    modelName: 'Wharehouse',
    timestamps: true,
  });
  return Wharehouse;
};

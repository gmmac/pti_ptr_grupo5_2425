'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EquipmentType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      EquipmentType.belongsToMany(models.CharityProject, {
        through: models.CharityProjectEquipmentType,
        foreignKey: 'equipmentTypeId',
        otherKey: 'charityProjectId'
      });
      
      
    }
  }
  EquipmentType.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'EquipmentType',
    timestamps: true,
  });
  return EquipmentType;
};

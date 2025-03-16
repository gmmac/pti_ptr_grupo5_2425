'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EquipmentModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EquipmentModel.belongsTo(models.Brand, {
        foreignKey: 'brand_id',
        targetKey: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }
  }
  EquipmentModel.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: true 
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'EquipmentModel',
    timestamps: true,
  });
  return EquipmentModel;
};

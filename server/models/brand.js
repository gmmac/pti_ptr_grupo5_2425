"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Brand.hasMany(models.EquipmentModel, {
        foreignKey: "brand_id",
        sourceKey: "id",
      });
    }
  }
  Brand.init(
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Brand",
      timestamps: true,
    }
  );
  return Brand;
};

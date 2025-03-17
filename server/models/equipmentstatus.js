"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class EquipmentStatus extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	EquipmentStatus.init(
		{
			state: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "EquipmentStatus",
			timestamps: true,
		}
	);
	return EquipmentStatus;
};

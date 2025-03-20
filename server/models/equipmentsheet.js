"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class EquipmentSheet extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			EquipmentSheet.belongsTo(models.EquipmentModel, {
				foreignKey: "model",
				targetKey: "id",
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			});

			EquipmentSheet.belongsTo(models.EquipmentType, {
				foreignKey: "type",
				targetKey: "id",
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			});

			EquipmentSheet.hasMany(models.UsedEquipment, {
				foreignKey: 'equipmentId',
				onDelete: 'CASCADE',
       			onUpdate: 'CASCADE'
			  });
		}
	}
	EquipmentSheet.init(
		{
			barcode: {
				type: DataTypes.STRING(20),
				primaryKey: true,
				allowNull: false,
				autoIncrement: false,
			},
			model: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			type: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "EquipmentSheet",
			timestamps: true,
		}
	);
	return EquipmentSheet;
};

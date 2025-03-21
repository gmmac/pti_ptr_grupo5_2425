"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class UsedEquipment extends Model {
		static associate(models) {
			UsedEquipment.belongsTo(models.EquipmentStatus, {
				foreignKey: "statusID",
				targetKey: "id",
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
				as: "EquipmentStatus",
			});

			UsedEquipment.belongsTo(models.EquipmentSheet, {
				foreignKey: "equipmentId",
				targetKey: "barcode",
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			});

			UsedEquipment.belongsTo(models.Store, {
				foreignKey: "storeId",
				targetKey: "nipc",
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			});


			UsedEquipment.belongsToMany(models.CharityProject, {
				through: models.UsedEquipmentCharityProject,
				foreignKey: 'usedEquipmentId',
				otherKey: 'charityProjectId'
			});
			
		}
	}
	UsedEquipment.init(
		{
			statusID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			putOnSaleDate: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			purchaseDate: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			equipmentId: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			storeId: {
				type: DataTypes.STRING(9),
				allowNull: false,
			},
			action: {
				type: DataTypes.STRING(1), // "D" -> Donation ou "S" -> Sale
			},
		},
		{
			sequelize,
			modelName: "UsedEquipment",
			timestamps: true,
		}
	);
	return UsedEquipment;
};

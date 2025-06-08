"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Interest extends Model {
		static associate(models) {
			// Cliente
			Interest.belongsTo(models.Client, {
				foreignKey: "clientNic",
				as: "client",
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			});

			// Marca
			Interest.belongsTo(models.Brand, {
				foreignKey: "brandID",
				as: "brand",
				onDelete: "SET NULL",
				onUpdate: "CASCADE",
			});

			// Modelo
			Interest.belongsTo(models.EquipmentModel, {
				foreignKey: "modelID",
				as: "model",
				onDelete: "SET NULL",
				onUpdate: "CASCADE",
			});

			Interest.belongsTo(models.EquipmentType, {
				foreignKey: "typeID",
				as: "type",
				onDelete: "SET NULL",
				onUpdate: "CASCADE",
			});

			// Equipment Sheet
			Interest.belongsTo(models.EquipmentSheet, {
				foreignKey: "equipmentSheetID",
				as: "equipmentSheet",
				onDelete: "SET NULL",
				onUpdate: "CASCADE",
			});

			// Estado do equipamento
			Interest.belongsTo(models.EquipmentStatus, {
				foreignKey: "equipmentStatusID",
				as: "equipmentStatus",
				onDelete: "SET NULL",
				onUpdate: "CASCADE",
			});
			Interest.hasMany(models.PreferredStoresInterets, {
  				foreignKey: 'interestId',
  				as: 'preferredStores',
			});
		}
	}

	Interest.init(
		{
			clientNic: {
				type: DataTypes.STRING(9),
				allowNull: false,
			},
			brandID: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			modelID: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			typeID: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			equipmentSheetID: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			equipmentStatusID: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			minLaunchYear: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			maxLaunchYear: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			minPrice: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			maxPrice: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			notified: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: "Interest",
			timestamps: true,
		}
	);

	return Interest;
};

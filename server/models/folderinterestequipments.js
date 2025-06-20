"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class FolderInterestEquipments extends Model {
		static associate(models) {
			FolderInterestEquipments.belongsTo(models.FolderInterest, {
				foreignKey: "folderInterestId",
				targetKey: "id",
				as: "folderInterest",
			});
			FolderInterestEquipments.belongsTo(models.Interest, {
				foreignKey: "interestId",
				targetKey: "id",
				as: "interest",
				onDelete: "SET NULL",
				onUpdate: "CASCADE",
			});
		}
	}

	FolderInterestEquipments.init(
		{
			folderInterestId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			interestId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "FolderInterestEquipments",
			timestamps: true,
		}
	);
	return FolderInterestEquipments;
};

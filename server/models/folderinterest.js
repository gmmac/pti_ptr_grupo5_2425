"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class FolderInterest extends Model {
		static associate(models) {
			FolderInterest.belongsTo(models.Client, {
				foreignKey: "clientNIC",
				targetKey: "nic",
				as: "client",
			});
			FolderInterest.belongsTo(models.Interest, {
				foreignKey: "interestId",
				targetKey: "id",
				as: "interest",
				onDelete: "SET NULL",
				onUpdate: "CASCADE",
			});
		}
	}

	FolderInterest.init(
		{
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			clientNIC: {
				type: DataTypes.STRING(9),
				allowNull: false,
			},
			interestId: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: "FolderInterest",
			timestamps: true,
		}
	);
	return FolderInterest;
};

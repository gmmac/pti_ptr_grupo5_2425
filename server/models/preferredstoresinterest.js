"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class PreferredStoresInterets extends Model {
		static associate(models) {
			PreferredStoresInterets.belongsTo(models.Store, {
				foreignKey: "storeId",
				as: "store",
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			});
			PreferredStoresInterets.belongsTo(models.Interest, {
				foreignKey: "interestId",
				as: "interest",
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			});
		}
	}
	PreferredStoresInterets.init(
		{
			storeId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Stores",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			interestId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Interests",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
		},
		{
			sequelize,
			modelName: "PreferredStoresInterets",
			timestamps: true,
		}
	);
	return PreferredStoresInterets;
};

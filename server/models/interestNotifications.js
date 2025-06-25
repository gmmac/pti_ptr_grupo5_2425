"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class InterestNotification extends Model {
		static associate(models) {
			InterestNotification.belongsTo(models.Client, {
				foreignKey: "clientNic",
				as: "client",
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			});

			InterestNotification.belongsTo(models.Interest, {
				foreignKey: "interestId",
				as: "interest",
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			});
		}
	}

	InterestNotification.init(
		{
			clientNic: {
				type: DataTypes.STRING(9),
				allowNull: false,
			},
			interestId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			isRead: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: "InterestNotification",
		}
	);

	return InterestNotification;
};

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class OrderStatus extends Model {
		static associate(models) {
			OrderStatus.hasMany(models.ClientPurchase, {
				foreignKey: "orderStatusID",
				sourceKey: "id",
			});
		}
	}
	OrderStatus.init(
		{
			state: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "OrderStatus",
			timestamps: true,
		}
	);
	return OrderStatus;
};

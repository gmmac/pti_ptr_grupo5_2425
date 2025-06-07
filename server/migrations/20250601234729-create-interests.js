"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Interests", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			clientNic: {
				type: Sequelize.STRING(9),
				allowNull: false,
				references: {
					model: "Clients",
					key: "nic",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
			brandID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: "Brands",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
			modelID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: "EquipmentModels",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},

			typeID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: "EquipmentTypes",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},

			equipmentSheetID: {
				type: Sequelize.STRING(20),
				allowNull: true,
				references: {
					model: "EquipmentSheets",
					key: "barcode",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
			equipmentStatusID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: "EquipmentStatuses",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
			minLaunchYear: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			maxLaunchYear: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			minPrice: {
				type: Sequelize.FLOAT,
				allowNull: true,
			},
			maxPrice: {
				type: Sequelize.FLOAT,
				allowNull: true,
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			notified: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Interests");
	},
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("PreferredStoresInterets", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			storeId: {
				type: Sequelize.STRING(9),
				allowNull: false,
				references: {
					model: "Stores",
					key: "nipc",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			interestId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Interests",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
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

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("PreferredStoresInterets");
	},
};

"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("FolderInterests", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			client: {
				type: Sequelize.STRING(9),
				allowNull: false,
				references: {
					model: "Clients",
					key: "nic",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			interestId: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: "Interests",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
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
		await queryInterface.dropTable("FolderInterests");
	},
};

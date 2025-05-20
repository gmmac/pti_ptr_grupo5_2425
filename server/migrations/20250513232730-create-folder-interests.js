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
			clientNIC: {
				type: Sequelize.STRING(9),
				allowNull: false,
				references: {
					model: "Clients",
					key: "nic",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE", // Ao apagar o cliente, apaga a pasta
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

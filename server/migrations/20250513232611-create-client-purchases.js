"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("ClientPurchases", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			clientNIC: {
				type: Sequelize.STRING(9),
				allowNull: false,
				references: {
					model: "Clients",
					key: "nic",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
			employeeID: {
				type: Sequelize.STRING(9),
				allowNull: false,
				references: {
					model: "Employees",
					key: "nic",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
			total: {
				type: Sequelize.FLOAT,
			},
			orderStatusID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "OrderStatuses", // <- TEM que estar assim (com S no fim)
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
			address: {
				type: Sequelize.STRING(100),
				allowNull: true,
			},
			storeId: {
				type: Sequelize.STRING(9),
				allowNull: true,
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
		await queryInterface.dropTable("ClientPurchases");
	},
};

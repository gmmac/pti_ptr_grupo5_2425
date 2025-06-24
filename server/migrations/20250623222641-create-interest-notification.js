"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("InterestNotifications", {
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
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			},
			interestId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Interests",
					key: "id",
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			},
			isRead: {
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
	async down(queryInterface) {
		await queryInterface.dropTable("InterestNotifications");
	},
};

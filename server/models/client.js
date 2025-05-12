"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Client.init(
    {
      nic: {
        type: DataTypes.STRING(9),
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
      },
      nif: {
        type: DataTypes.STRING(9),
        unique: true,
        allowNull: true,
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(9),
        allowNull: true,
        unique: true,
      },
      address: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      latitude: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      longitude: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      isActive: {
        type: DataTypes.STRING(1),
      },
    },
    {
      sequelize,
      modelName: "Client",
      timestamps: true,
    }
  );
  return Client;
};

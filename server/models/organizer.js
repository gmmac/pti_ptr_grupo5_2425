'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organizer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Organizer.init({
    nic: {
      type: DataTypes.STRING(9),
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    },
    nif: {
      type: DataTypes.STRING(9),
      unique: true,
      allowNull: true
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(9),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Organizer',
    timestamps: true,
  });
  return Organizer;
};

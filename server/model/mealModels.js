const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Meal = sequelize.define('Meal', {
  // Columns/fields of the table
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cuisineType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ingredient: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.BLOB,
    allowNull: false
  },
 
  // ... add more columns as needed
});

module.exports = Meal;

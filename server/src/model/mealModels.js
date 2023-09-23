const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');
const Restau = require('./restauModels');

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
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Restau.restauModels,
      key: 'id',
    },
  },
  cuisineType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
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

Meal.belongsTo(Restau, { foreignKey: 'restaurantId' });

module.exports = Meal;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
//const associations = require('./associations');

const Restau = sequelize.define('Restau', {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
  },
  restauName: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  town: {
    type: DataTypes.STRING,
  },
  quarter: {
    type: DataTypes.STRING,
  }
  
  
  // ... add more columns as needed
});

module.exports = Restau;

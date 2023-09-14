const { DataTypes, Association } = require('sequelize');
const sequelize = require('../config/db.config');
//const associations = require('./associations');

const User = sequelize.define('User', {
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
 
  // ... add more columns as needed
});



module.exports = User;

const Sequelize = require('sequelize');

const sequelize = new Sequelize('cuisine_afrique', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
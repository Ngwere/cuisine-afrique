const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const dbUserName = process.env['DB_USER_NAME'];
const dbUserPassword = process.env['DB_USER_PASSWORD'];
const dbCluster = process.env['DB_CLUSTER'];
const dbName = process.env['DB_NAME'];
const postgresURL = `postgres://${dbUserName}:${dbUserPassword}@${dbCluster}.render.com/${dbName}?ssl=true`;

const sequelize = new Sequelize(postgresURL, {
	dielect: 'postgres',
	protocol: 'postgres',
	dialectOptions: {
		ssl: process.env.DB_ENABLE_SSL && {
			require: true,
		},
	},
});

module.exports = sequelize;

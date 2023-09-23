const Sequelize = require('sequelize');

const sequelize = new Sequelize(
	'postgres://cuisinafrique_user:QzVL3BeC49qIrdudFBvODgfW2c5JYUz9@dpg-ck7ml6fsasqs73870qh0-a.oregon-postgres.render.com/cuisinafrique?ssl=true',
	{
		dielect: 'postgres',
		protocol: 'postgres',
		dialectOptions: {
			ssl: process.env.DB_ENABLE_SSL && {
				require: true,
			},
		},
	}
);

module.exports = sequelize;

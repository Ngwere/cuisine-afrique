const express = require('express');
const sequelize = require('./src/config/db.config');
const User = require('./model/userModels');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const app = express();

const port = process.env.PORT || 5000;

app.use(express.static('images'));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '_' + file.originalname);
	},
});

const upload = multer({ storage: storage });
// Add headers before the routes are defined

app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	);

	// Request headers you wish to allow
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,content-type'
	);

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

//var corsOptions = {
//origin: ['http://api:3000', '*'],
//methods: ['GET', 'POST', 'PUT', 'DELETE'],
//allowedHeaders: ['Content-Type', 'Authorization'],
//credentials: true
//};
//app.use(cors(corsOptions));
//app.use(cors());

// pare requests of content-type-application/json

app.use(bodyParser.json());
// pare requests of contest-type-application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.static('./public'));

app.use(express.json());
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/restaurants', require('./routes/restaurantRoutes'));
app.use('/api/meals', require('./routes/mealRoutes'));
app.use('/api/mealratings', require('./routes/mealRatings'));

//database sync
sequelize
	.sync()
	.then(() => {
		console.log('Database and tables synchronized');
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch((error) => {
		console.error('Error synchronizing database:', error);
	});

app.use(errorHandler);

/*app.listen(port, () => {
    console.log(`Sever running on port ${port}`);
});*/

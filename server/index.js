const express = require("express");
const sequelize = require("./config/db.config");
const User = require("./model/userModels");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config(); 
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8080"
};
app.use(cors(corsOptions));

// pare requests of content-type-application/json

app.use (bodyParser.json());
// pare requests of contest-type-application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({extended:true}));

//Set port, listen for requests 
const port = process.env.PORT || 5000;

//app.use(express.static('./public'));

app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/restaurants", require("./routes/restaurantRoutes"));
app.use("/api/meals", require("./routes/mealRoutes"));
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
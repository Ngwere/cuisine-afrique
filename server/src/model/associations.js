

// const MealRating = require("./mealRatingModels"); //importing mealRatingModels in mealModels
// const Restaurant = require("./restauModels");
// const Meal = require('./mealModels'); //importing mealModels in mealRatingModels
// const User = require('./userModels');
const { mealModels, restauModels, userModels } = require("../");
//const { Sequelize } = require('sequelize');
// Define associations
const associateModels = () => {
  // Define associations between models using Sequelize methods
  
  //mealModels.hasMany(mealRatingModels, { foreignkey: "mealId" });
  //Rating.belongsTo(Meal, { foreignkey: "mealId"});
  mealModels.belongsTo(restauModels, { foreignKey: 'restaurantId' });
  //Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
  
  mealRatingModels.belongsTo(userModels, { foreignKey: 'userId' });
  mealRatingModels.belongsTo(mealModels, { foreignKey: 'mealId' });
  //User.hasMany(MealRating, { foreignKey: 'userId' });
};

// Export the associateModels function
module.exports = associateModels;
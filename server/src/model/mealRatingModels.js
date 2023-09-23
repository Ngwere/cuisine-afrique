const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');
//const associateModels = require('./associations');
const User = require('./userModels');
const Meal = require('./mealModels');

const MealRating = sequelize.define('MealRating', {
  // Columns/fields of the table
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User.userModels,
      key: 'id',
    }
  },
  mealId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Meal.mealModels,
      key: 'id',
    },
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 5,
    },
  }
 
  // ... add more columns as needed
});

MealRating.belongsTo(User, { foreignKey: 'userId' });
MealRating.belongsTo(Meal, { foreignKey: 'mealId' });

module.exports = MealRating;

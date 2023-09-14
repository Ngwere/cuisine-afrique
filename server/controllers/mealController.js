const asyncHandler = require("express-async-handler");
const Meal = require('../model/mealModels');
//@desc Get meals
//@route Get /api/meals
//@access public
const getMeals = asyncHandler(async (req, res) => {
    //res.status(200).json({message: "Get all meals"});
    Meal.findAll().then(meals => {
        res.send(meals);
    }).catch(err => {
        return res.status(500).send({ message: err.message || "Some error occured while retrieving meals" });
    });
});

//@desc Create meals
//@route POST /api/meals/
//@access public
const createMeal = asyncHandler(async (req, res) => {
    console.log("The request body is: ", req.body);
    const { name } = req.body;
    if (!name ) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    //return res.status(200).json({ message: `Create meal with id` });

    //the mapping logic using sequlize
    const meal = {
        name: req.body.name,
        description: req.body.description,
        cuisineType: req.body.cuisineType,
        restauName: req.body.restauName,
        ingredient: req.body.ingredient,
        restaurantId: req.body.restaurantId,
        price: req.body.price,
        image: req.body.image
    };

    //saving the values to the database
    Meal.create(meal).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some errors will occur when creating a meal"
        });
    });
});

//@desc Get meals
//@route Get /api/meals:id
//@access public
const getMeal = asyncHandler(async (req, res) => {
    //res.status(200).json({message: `Get meal with id ${req.params.id}` });
    const mealID = req.params.id; //this is passed as a route parameter

    Meal.findByPk(mealID).then(meal => {
        if (!meal){
            res.status(404).send({ message: "Meal not found" });
        } else {
            res.send(meal);
        }
    }).catch(err => {
        res.status(500).send( {message: err.message || "`Some error occured while retrieving meal with id ${req.params.id}`"} );
    });
});

//@desc update meals
//@route PUT /api/meals:id
//@access public
const updateMeal = asyncHandler(async (req, res) => {
    //res.status(200).json({message: `Update meal with id ${req.params.id}` });

    const mealID = req.params.id;
    const { name} = req.body; 

   Meal.update({ name }, { where: { id: mealID } }).then( numUpdated => {
        if (numUpdated[0] === 1) {
            res.send({ message: "Meal updated successfully" });
    } else {
        res.status(404).send({ message: "Meal not found" });
      }
    }).catch(err => {
        res.status(500).send({ message: err.message || 'Some error occurred while updating the meal' });
    });
});

//@desc update meals
//@route Delete /api/meals:id
//@access public
const deleteMeal = asyncHandler(async (req, res) => {
    //res.status(200).json({message: `Delete meal with id ${req.params.id}` });

    const mealID = req.params.id;

    Meal.destroy({ where: { id: mealID } }).then(numDeleted => {
        if (numDeleted === 1){
            res.send({ message: `Meal with id ${req.params.id} deleted successfully` });
        } else {
            res.status(404).send({ message: `Meal with id ${req.params.id} not found` });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message || `Some error occured while deleting meal with id ${req.params.id}` });
    });
});


module.exports = { 
    getMeals, 
    getMeal,
    createMeal,
    updateMeal,
    deleteMeal
 }

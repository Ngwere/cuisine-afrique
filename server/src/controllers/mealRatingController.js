const asyncHandler = require("express-async-handler");
const MealRating = require("../model/mealRatingModels");
//@desc Get mealRatings
//@route Get /api/mealRatings
//@access public
const getMealRatings = asyncHandler(async (req, res) => {
    //res.status(200).json({message: "Get all mealRatings"});
    MealRating.findAll().then(mealRatings => {
        res.send(mealRatings);
    }).catch(err => {
        return res.status(500).send({ message: err.message || "Some error occured while retrieving mealRatings" });
    });
});

//@desc Create mealRatings
//@route POST /api/mealRatings/
//@access public
const createMealRating = asyncHandler(async (req, res) => {
    console.log("The request body is: ", req.body);
    const { rating } = req.body;
    if ( !rating ) {
        res.status(400);
        throw new Error("The rating must not be empty!");
    }
    //return res.status(200).json({ message: `Create mealRating with id` });

    //the mapping logic using sequlize
    const mealRating = {
        userId: req.body.userId,
        mealId: req.body.mealId,
        comment: req.body.comment,
        rating: req.body.rating
    };

    //saving the values to the database
    MealRating.create(mealRating).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some errors will occur when creating a mealRating"
        });
    });
});

//@desc Get mealRatings
//@route Get /api/mealRatings:id
//@access public
const getMealRating = asyncHandler(async (req, res) => {
    //res.status(200).json({message: `Get mealRating with id ${req.params.id}` });
    const mealRatingID = req.params.id; //this is passed as a route parameter

    MealRating.findByPk(mealRatingID).then(mealRating => {
        if (!mealRating){
            res.status(404).send({ message: "MealRating not found" });
        } else {
            res.send(mealRating);
        }
    }).catch(err => {
        res.status(500).send( {message: err.message || "`Some error occured while retrieving mealRating with id ${req.params.id}`"} );
    });
});

//@desc update mealRatings
//@route PUT /api/mealRatings:id
//@access public
const updateMealRating = asyncHandler(async (req, res) => {
    //res.status(200).json({message: `Update mealRating with id ${req.params.id}` });

    const mealRatingID = req.params.id;
    const { userId, mealId, rating, comment} = req.body; 

   MealRating.update({ userId, mealId, rating, comment}, { where: { id: mealRatingID } }).then( numUpdated => {
        if (numUpdated[0] === 1) {
            res.send({ message: "MealRating updated successfully" });
    } else {
        res.status(404).send({ message: "MealRating not found" });
      }
    }).catch(err => {
        res.status(500).send({ message: err.message || 'Some error occurred while updating the mealRating' });
    });
});

//@desc update mealRatings
//@route Delete /api/mealRatings:id
//@access public
const deleteMealRating = asyncHandler(async (req, res) => {
    //res.status(200).json({message: `Delete mealRa ting with id ${req.params.id}` });

    const mealRatingID = req.params.id;

    MealRating.destroy({ where: { id: mealRatingID } }).then(numDeleted => {
        if (numDeleted === 1){
            res.send({ message: `MealRating with id ${req.params.id} deleted successfully` });
        } else {
            res.status(404).send({ message: `MealRating with id ${req.params.id} not found` });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message || `Some error occured while deleting mealRating with id ${req.params.id}` });
    });
});


module.exports = { 
    getMealRatings, 
    getMealRating,
    createMealRating,
    updateMealRating,
    deleteMealRating
 }
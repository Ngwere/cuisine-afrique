const express = require("express");
const router = express.Router();
const {
    getMealRatings,
    getMealRating,
    createMealRating,
    updateMealRating,
    deleteMealRating
} = require("../controllers/mealRatingController");

router.post('/', createMealRating);
router.get('/', getMealRatings);

router.route("/:id").get(getMealRating).put(updateMealRating).delete(deleteMealRating);

module.exports = router;
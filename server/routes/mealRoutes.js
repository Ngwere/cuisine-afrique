const express = require("express");
const router = express.Router();
const {
    getMeals,
    getMeal,
    createMeal,
    updateMeal,
    deleteMeal
} = require("../controllers/mealController");

router.post('/', createMeal);
router.get('/', getMeals);

router.route("/:id").get(getMeal).put(updateMeal).delete(deleteMeal);

module.exports = router;
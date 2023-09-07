const express = require("express");
const router = express.Router();
const {
    getRestaus,
    getRestau,
    createRestau,
    updateRestau,
    deleteRestau
} = require("../controllers/restauController");

router.post('/', createRestau);
router.get('/', getRestaus);

router.route("/:id").get(getRestau).put(updateRestau).delete(deleteRestau);

module.exports = router;
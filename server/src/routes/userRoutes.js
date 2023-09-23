const express = require("express");
const router = express.Router();
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

router.post('/', createUser);
router.get('/', getUsers);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
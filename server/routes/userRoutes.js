const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
    res.status(200).json({message: "Get all contacts"});
});

router.route("/").post((req, res) => {
    res.status(200).json({message: "Create user"});
});

router.route("/:id").get((req, res) => {
    res.status(200).json({message: `Get user with id ${req.params.id}` });
});

router.route("/:id").put((req, res) => {
    res.status(200).json({message: `Update user with id ${req.params.id}` });
});

router.route("/:id").delete((req, res) => {
    res.status(200).json({message: `Delete user with id ${req.params.id}` });
});

module.exports = router;
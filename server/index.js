const express = require("express");

const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, () => {
//app.get("/api", (req, res) => {
//app.get("/api", (req, res) => {
    console.log(`Sever running on port ${port}`);
});
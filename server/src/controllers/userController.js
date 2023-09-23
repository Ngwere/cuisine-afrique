const asyncHandler = require("express-async-handler");
const User = require('../model/userModels');
const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post(
    '/signup',
    
  );
  

//@desc Get users
//@route Get /api/users
//@access public
const getUsers = asyncHandler(async (req, res) => {
    //res.status(200).json({message: "Get all users"});
    User.findAll().then(users => {
        res.send(users);
    }).catch(err => {
        return res.status(500).send({ message: err.message || "Some error occured while retrieving users" });
    });
});

//@desc Create users
//@route POST /api/users/
//@access public
const createUser = asyncHandler(async (req, res) => {
    console.log("The request body is: ", req.body);
    const {name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    //return res.status(200).json({ message: `Create user with id` });

    //the mapping logic using sequlize
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    //saving the values to the database
    User.create(user).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some errors will occur when creating a user"
        });
    });
});

//@desc Get users
//@route Get /api/users:id
//@access public
const getUser = asyncHandler(async (req, res) => {
    //res.status(200).json({message: `Get user with id ${req.params.id}` });
    const userID = req.params.id; //this is passed as a route parameter

    User.findByPk(userID).then(user => {
        if (!user){
            res.status(404).send({ message: "User not found" });
        } else {
            res.send(user);
        }
    }).catch(err => {
        res.status(500).send( {message: err.message || "`Some error occured while retrieving user with id ${req.params.id}`"} );
    });
});

//@desc update users
//@route PUT /api/users:id
//@access public
const updateUser = asyncHandler(async (req, res) => {
    //res.status(200).json({message: `Update user with id ${req.params.id}` });

    const userID = req.params.id;
    const { name, email, password } = req.body; 

   User.update({ name, email, password}, { where: { id: userID } }).then( numUpdated => {
        if (numUpdated[0] === 1) {
            res.send({ message: "User updated successfully" });
    } else {
        res.status(404).send({ message: "User not found" });
      }
    }).catch(err => {
        res.status(500).send({ message: err.message || 'Some error occurred while updating the user' });
    });
});

//@desc update users
//@route Delete /api/users:id
//@access public
const deleteUser = asyncHandler(async (req, res) => {
    //res.status(200).json({message: `Delete user with id ${req.params.id}` });

    const userID = req.params.id;

    User.destroy({ where: { id: userID } }).then(numDeleted => {
        if (numDeleted === 1){
            res.send({ message: `User with id ${req.params.id} deleted successfully` });
        } else {
            res.status(404).send({ message: `User with id ${req.params.id} not found` });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message || `Some error occured while deleting user with id ${req.params.id}` });
    });
});


module.exports = { 
    getUsers, 
    getUser,
    createUser,
    updateUser,
    deleteUser
 }
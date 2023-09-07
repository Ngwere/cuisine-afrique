const asyncHandler = require("express-async-handler");
const Restau = require('../model/restauModels');
//@desc Get restaus
//@route Get /api/restaus
//@access public
const getRestaus = asyncHandler(async (req, res) => {
    //res.status(200).json({message: "Get all restaus"});
    Restau.findAll().then(restaus => {
        res.send(restaus);
    }).catch(err => {
        return res.status(500).send({ message: err.message || "Some error occured while retrieving restaus" });
    });
});

//@desc Create restaus
//@route POST /api/restaus/
//@access public
const createRestau = asyncHandler(async (req, res) => {
    console.log("The request body is: ", req.body);
    const {name, email, password, restauName, country, town, quarter } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    //return res.status(200).json({ message: `Create restau with id` });

    //the mapping logic using sequlize
    const restau = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        restauName: req.body.restauName,
        country: req.body.country,
        town: req.body.town,
        quarter: req.body.quarter
    };

    //saving the values to the database
    Restau.create(restau).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some errors will occur when creating a restau"
        });
    });
});

//@desc Get restaus
//@route Get /api/restaus:id
//@access public
const getRestau = asyncHandler(async (req, res) => {
    //res.status(200).json({message: `Get restau with id ${req.params.id}` });
    const restauID = req.params.id; //this is passed as a route parameter

    Restau.findByPk(restauID).then(restau => {
        if (!restau){
            res.status(404).send({ message: "Restau not found" });
        } else {
            res.send(restau);
        }
    }).catch(err => {
        res.status(500).send( {message: err.message || "`Some error occured while retrieving restau with id ${req.params.id}`"} );
    });
});

//@desc update restaus
//@route PUT /api/restaus:id
//@access public
const updateRestau = asyncHandler(async (req, res) => {
    //res.status(200).json({message: `Update restau with id ${req.params.id}` });

    const restauID = req.params.id;
    const { name, email, password } = req.body; 

   Restau.update({ name, email, password}, { where: { id: restauID } }).then( numUpdated => {
        if (numUpdated[0] === 1) {
            res.send({ message: "Restau updated successfully" });
    } else {
        res.status(404).send({ message: "Restau not found" });
      }
    }).catch(err => {
        res.status(500).send({ message: err.message || 'Some error occurred while updating the restau' });
    });
});

//@desc update restaus
//@route Delete /api/restaus:id
//@access public
const deleteRestau = asyncHandler(async (req, res) => {
    //res.status(200).json({message: `Delete restau with id ${req.params.id}` });

    const restauID = req.params.id;

    Restau.destroy({ where: { id: restauID } }).then(numDeleted => {
        if (numDeleted === 1){
            res.send({ message: `Restau with id ${req.params.id} deleted successfully` });
        } else {
            res.status(404).send({ message: `Restau with id ${req.params.id} not found` });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message || `Some error occured while deleting restau with id ${req.params.id}` });
    });
});


module.exports = { 
    getRestaus, 
    getRestau,
    createRestau,
    updateRestau,
    deleteRestau
 }
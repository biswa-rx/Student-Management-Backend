const express = require('express');
const router = express.Router();

const RegisterTeacherController = require('../Controllers/RegisterTeacher.controller');

//Get a list of all products
router.get('/', RegisterTeacherController.getAllTeacher);

//Create a new product
router.post('/', RegisterTeacherController.createNewTeacher);

//Get a product by id
router.get('/:id', RegisterTeacherController.findTeacherById);

//Update a product by id
router.patch('/:id', RegisterTeacherController.updateATeacher);

//Delete a product by id
router.delete('/:id', RegisterTeacherController.deleteATeacher);

module.exports = router;
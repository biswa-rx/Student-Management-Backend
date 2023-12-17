const express = require('express');
const router = express.Router();

const RegisterStudentController = require('../Controllers/RegisterStudent.controller');

//Get a list of all products
router.get('/', RegisterStudentController.getAllStudent);

//Create a new product
router.post('/', RegisterStudentController.createNewStudent);

//Get a product by id
router.get('/:id', RegisterStudentController.findStudentById);

//Update a product by id
router.patch('/:id', RegisterStudentController.updateAStudent);

//Delete a product by id
router.delete('/:id', RegisterStudentController.deleteAStudent);

module.exports = router;
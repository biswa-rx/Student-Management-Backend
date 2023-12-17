const createError = require('http-errors');
const mongoose = require('mongoose');

const Student = require('../Models/Student.model');

module.exports = {
  getAllStudent: async (req, res, next) => {
    try {
      const results = await Student.find({}, { __v: 0 });
      // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Product.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewStudent: async (req, res, next) => {
    try {
      const product = new Student(req.body);
      const result = await product.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }

    /*Or:
  If you want to use the Promise based approach*/
    /*
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err.message);
    }); 
    */
  },

  findStudentById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Student.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!product) {
        throw createError(404, 'Student does not exist.');
      }
      res.send(product);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Student id'));
        return;
      }
      next(error);
    }
  },

  updateAStudent: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Student.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Student does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Student Id'));
      }

      next(error);
    }
  },

  deleteAStudent: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Student.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Student does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Student id'));
        return;
      }
      next(error);
    }
  }
};

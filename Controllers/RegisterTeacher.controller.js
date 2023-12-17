const createError = require('http-errors');
const mongoose = require('mongoose');

const Teacher = require('../Models/Teacher.model');

module.exports = {
  getAllTeacher: async (req, res, next) => {
    try {
      const results = await Teacher.find({}, { __v: 0 });
      // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Product.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewTeacher: async (req, res, next) => {
    try {
      const product = new Teacher(req.body);
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

  findTeacherById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Teacher.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!product) {
        throw createError(404, 'Teacher does not exist.');
      }
      res.send(product);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Teacher id'));
        return;
      }
      next(error);
    }
  },

  updateATeacher: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Teacher.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Teacher does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Teacher Id'));
      }

      next(error);
    }
  },

  deleteATeacher: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Teacher.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Teacher does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Teacher id'));
        return;
      }
      next(error);
    }
  }
};

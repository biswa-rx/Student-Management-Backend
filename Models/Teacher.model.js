const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  redg_no: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

const Teacher = mongoose.model('teacher', TeacherSchema);
module.exports = Teacher;

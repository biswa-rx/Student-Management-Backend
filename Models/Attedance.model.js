const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttedanceSchema = new Schema({
    teacher_name: {
        type: String,
        required: true
      },
      student_name: {
        type: String,
        required: true
      },
      attedance: {
        type: Number,
        required: true
      }
});

const Attedance = mongoose.model('attedance', AttedanceSchema);
module.exports = Attedance;
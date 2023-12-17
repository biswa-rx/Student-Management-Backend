const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
    teacher_name: {
        type: String,
        required: true
      },
  topic: {
    type: String,
    required: true
  },
  assignment: {
    type: String,
    required: true
  }
});

const Assignment = mongoose.model('assignment', AssignmentSchema);
module.exports = Assignment;

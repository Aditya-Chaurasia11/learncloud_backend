const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  position: {
    type: Number,
    required: true, // Or adjust validation as needed
  },
});

module.exports = mongoose.model("task", taskSchema);

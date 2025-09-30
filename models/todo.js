const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  done: { type: Boolean, default: false },
  date: {
    type: Date,
    default: Date.now
  },
  startTime: { type: String, required: true }
});

// method that will convert object to JSON (toJSON)
todoSchema.methods.toJSON = function () {
    console.log("toJSON method called");
  const todo = this;
  const todoObject = todo.toObject();
  delete todoObject.__v;
  console.log("Converted to JSON:", todoObject);
  return todoObject;
};

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:23017/todoApp")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

module.exports = mongoose;
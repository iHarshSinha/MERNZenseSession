const mongoose = require("../db");
const Todo = require("../models/todo");

async function seedTodos() {
  try {
    // Delete old data
    await Todo.deleteMany({});

    // Insert new data
    const todos = [
      { task: "Buy milk", done: false, startTime: "08:00 AM" },
      { task: "Do homework", done: false, startTime: "11:00 AM" },
      { task: "Walk the dog", done: true, startTime: "09:00 AM" },
      { task: "Read a book", done: true, startTime: "07:00 PM" },
      { task: "Go for a run", done: false, startTime: "06:00 AM" },
    ];

    await Todo.insertMany(todos);
    console.log("🌱 Seed data inserted");
  } catch (err) {
    console.error("❌ Error while seeding:", err);
  } finally {
    mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
  }
}

seedTodos();
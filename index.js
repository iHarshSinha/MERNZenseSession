const express = require("express");
require("./db"); // 1
const Todo = require("./models/todo"); // 2

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    console.log(req.url)
  res.send("Hello World");
});













app.get("/todos", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.get("/todos/filter",async (req, res) => {
    const { done } = req.query;
    const todos = await Todo.find(done ? { done: done === 'true' } : {});
    res.json(todos);
});

app.post("/todo", async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(201).json(newTodo);
});

app.put("/todo/:id", async (req, res) => {
    const { id } = req.params;
    const { task, done } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(id, { task, done }, { new: true });
    if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" });
    }
    return res.json(updatedTodo);

});

app.delete("/todo/:id", async (req, res) => {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
        return res.status(404).json({ error: "Todo not found" });
    }
    return res.json({ message: "Todo deleted" });
});

app.use((req, res) => {
  res.status(404).send("Route not found");
});





app.listen(3000, () => console.log("Server running on http://localhost:3000"));
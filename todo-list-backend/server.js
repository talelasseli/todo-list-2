import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import Category from "./models/Category.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Todo API with Categories is running.");
});

// Get all categories with their todos
app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// Get one category by ID
app.get("/categories/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
});

// Create a new category
app.post("/categories", async (req, res) => {
  try {
    const { name, color } = req.body;
    const newCategory = new Category({ name, color, todos: [] });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ error: "Failed to create category" });
  }
});

// Update a category (name/color)
app.patch("/categories/:id", async (req, res) => {
  try {
    const { name, color } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    if (name) category.name = name;
    if (color) category.color = color;
    await category.save();

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: "Failed to update category" });
  }
});

// Delete a category
app.delete("/categories/:id", async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Category not found" });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete category" });
  }
});

// --- TODO ROUTES (nested under categories) ---

// Get all todos in a category
app.get("/categories/:categoryId/todos", async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category.todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// Get one todo in a category
app.get("/categories/:categoryId/todos/:todoId", async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ error: "Category not found" });

    const todo = category.todos.id(req.params.todoId);
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todo" });
  }
});

// Create a new todo in a category
app.post("/categories/:categoryId/todos", async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ error: "Category not found" });

    category.todos.push({ title, description, completed });
    await category.save();

    const newTodo = category.todos[category.todos.length - 1];
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ error: "Failed to create todo" });
  }
});

// Update a todo in a category
app.patch("/categories/:categoryId/todos/:todoId", async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ error: "Category not found" });

    const todo = category.todos.id(req.params.todoId);
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    if (req.body.title !== undefined) todo.title = req.body.title;
    if (req.body.description !== undefined)
      todo.description = req.body.description;
    if (req.body.completed !== undefined) todo.completed = req.body.completed;

    await category.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// Delete a todo from a category
app.delete("/categories/:categoryId/todos/:todoId", async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ error: "Category not found" });

    category.todos.pull(req.params.todoId);
    await category.save();

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// Connect to DB then start server
const start = async () => {
  await connectDB();
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
};

start();

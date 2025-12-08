import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Task } from "./models/task.js";




dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Todo backend running");
});

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find().sort({ _id: -1 });
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    category: req.body.category || "General",
    priority: req.body.priority || "Low",
    deadline: req.body.deadline || "",
    completed: false
  });

  res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.put("/tasks/edit/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
});

app.put("/tasks/complete/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});

// Run server
app.listen(process.env.PORT || 5000, () =>
  console.log("Server running on port " + (process.env.PORT || 5000))
);




import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  category: String,
  priority: String,
  deadline: String,
  completed: { type: Boolean, default: false }
});

// Use named export for Node 24 compatibility
export const Task = mongoose.model("Task", taskSchema);

import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: { type: String, default: "#3b82f6" },
    todos: [todoSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);

import mongoose from "mongoose";

const list = new mongoose.Schema(
  {
    name: { type: String, required: true },
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todos" }],
  },
  { timestamps: true }
);
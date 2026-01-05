"use client";

import { useState } from "react";
import { X, ListPlus } from "lucide-react";

const CreateTodo = ({ onClose, selectedList }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  console.log("Selected List in CreateTodo:", selectedList);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = { title, description, completed };
    fetch(`http://localhost:5000/categories/${selectedList}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Todo created:", data);
        const normalized = {
          ...data,
          id: data.id ?? (data._id ? String(data._id) : undefined),
          description: data.description ?? "",
          category: selectedList,
        };
        window.dispatchEvent(
          new CustomEvent("todoCreated", { detail: normalized })
        );
        setTitle("");
        setDescription("");
        setCompleted(false);
        if (onClose) onClose();
      })
      .catch((error) => {
        console.error("Error creating todo:", error);
      });
  };

  return (
    <div
      className="CreateTodoModal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="CreateTodoContent bg-[#2d2e30] rounded-lg shadow-2xl w-full max-w-lg mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-medium text-white">Create New Todo</h2>
          <button
            className="CloseButton p-1 hover:bg-gray-700 rounded-full transition-colors text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title Field */}
          <div>
            <label
              htmlFor="todoTitle"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Title
            </label>
            <input
              id="todoTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter todo title..."
              autoFocus
              className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="todoDescription"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Description
            </label>
            <textarea
              id="todoDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description (optional)..."
              rows={4}
              className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
            />
          </div>

          {/* Completed Checkbox */}
          <div className="flex items-center gap-3">
            <input
              id="todoCompleted"
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="w-4 h-4 bg-[#1a1a1a] border-gray-600 rounded cursor-pointer accent-blue-600"
            />
            <label
              htmlFor="todoCompleted"
              className="text-sm text-gray-300 cursor-pointer"
            >
              Mark as completed
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              <ListPlus size={18} />
              Create Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTodo;

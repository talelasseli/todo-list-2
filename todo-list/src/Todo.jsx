import { Trash2, MoreVertical } from "lucide-react";

const Todo = ({ data, category, onUpdate }) => {
  const { id, title, description, completed } = data;

  const handleDelete = () => {
    fetch(`http://localhost:5000/categories/${category}/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete todo");
        }
        console.log("Todo deleted");
        onUpdate(); // Trigger refetch after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
        alert("Failed to delete todo. Please try again.");
      });
  };

  const handleToggle = () => {
    fetch(`http://localhost:5000/categories/${category}/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update todo");
        }
        return response.json();
      })
      .then(() => {
        onUpdate(); // Trigger refetch after successful update
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
        alert("Failed to update todo. Please try again.");
      });
  };

  return (
    <div
      className={`group bg-[#131314] hover:bg-[#2d2e30] rounded-lg p-4 mb-3 transition-all duration-200 border border-transparent  ${
        completed ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <div className="flex-shrink-0 pt-1">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={completed}
              onChange={handleToggle}
              className="sr-only peer"
            />
            <div className="w-5 h-5 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-hover:border-gray-500 transition-all relative flex items-center justify-center">
              {completed && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
          </label>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="TodoHeader mb-2">
            <h2
              className={`text-base font-normal text-white ${
                completed ? "line-through text-gray-400" : ""
              }`}
            >
              {title}
            </h2>
          </div>
          {description && (
            <p
              className={`text-sm leading-relaxed ${
                completed ? "line-through text-gray-500" : "text-gray-400"
              }`}
            >
              {description}
            </p>
          )}
        </div>

        {/* Delete Button */}
        <div className="flex-shrink-0">
          <button
            onClick={handleDelete}
            className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors transition-opacity duration-200 opacity-0 group-hover:opacity-100"
            title="Delete todo"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;

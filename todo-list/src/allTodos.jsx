import { useEffect, useState } from "react";
import useFetch from "./useFetch.jsx";
import Todo from "./Todo.jsx";
import CreateTodo from "./Create.jsx";
import { Plus } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AllTodos = ({ category }) => {
  console.log("Category:", category);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showCreate, setShowCreate] = useState(false);

  const { data, error } = useFetch(
    `${API_URL}/categories/${category}/todos?refresh=${refreshKey}`
  );

  const normalizedTodos = data
    ? data.map((todo) => ({
        ...todo,
        id: todo.id ?? (todo._id ? String(todo._id) : undefined),
        description: todo.description ?? "",
      }))
    : [];

  const handleRefetch = () => {
    setRefreshKey((prev) => prev + 1);
  };
  // Listen for new todos created
  useEffect(() => {
    const handleTodoCreated = (event) => {
      const newTodo = event.detail;
      console.log("New todo received in AllTodos:", newTodo);

      if (newTodo && newTodo.category && newTodo.category === category) {
        // Trigger a refetch when a new todo is created
        handleRefetch();
      }
    };

    window.addEventListener("todoCreated", handleTodoCreated);
    return () => {
      window.removeEventListener("todoCreated", handleTodoCreated);
    };
  }, [category]);

  // Reset refresh key when category changes
  useEffect(() => {
    setRefreshKey(0);
  }, [category]);

  if (error) return <div>Error: {error}</div>;
  console.log("Normalized Todos:", normalizedTodos);

  if (normalizedTodos.length === 0)
    return (
      <div className="text-gray-400 align-start flex justify-center items-center h-32">
        <h2 className="text-center">No tasks yet, Add a new task!</h2>
      </div>
    );

  return (
    <div className="AllTodos bg-[#131314] p-4 rounded-lg">
      <div className="px-4 py-2">
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#131314] hover:bg-[#2d2e30] rounded-full transition-colors w-full"
        >
          <Plus size={20} />
          <span className="text-sm">Add Task</span>
        </button>
      </div>

      {showCreate && (
        <CreateTodo
          open={true}
          onClose={() => setShowCreate(false)}
          selectedList={category}
          list={category}
        />
      )}
      <ul>
        {normalizedTodos.reverse().map((todo) => (
          <Todo
            key={todo.id}
            data={todo}
            category={category}
            onUpdate={handleRefetch}
          />
        ))}
      </ul>
    </div>
  );
};

export default AllTodos;

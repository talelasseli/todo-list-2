// Home.jsx
import AllTodos from "./allTodos.jsx";
import { MoreVertical } from "lucide-react";
import { Trash2 } from "lucide-react";

const Home = ({
  List,
  selectedListTitle,
  setSelectedList,
  setSelectedListTitle,
}) => {
  const handleDelete = () => {
    console.log("Delete button clicked for list:", List);
    if (List === "695a5bff4285cd153ad6a067") {
      console.error("Cannot delete default list.");
      alert("Cannot delete the default list.");
      return;
    }
    fetch(`http://localhost:5000/categories/${List}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("List deleted:", List);
        setSelectedList("695a5bff4285cd153ad6a067"); // Reset to default list after deletion
        setSelectedListTitle("My Tasks");

        // Notify other components about the deletion
        window.dispatchEvent(new CustomEvent("listDeleted", { detail: List }));
      })
      .catch((error) => {
        console.error("Error deleting list:", error);
      });
  };
  return (
    <div className="Home flex-1 h-screen bg-[#202124] text-white overflow-y-auto">
      {/* Header */}
      <div className="border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <h2 className="text-2xl font-normal">{selectedListTitle}</h2>
          <button
            onClick={handleDelete}
            className="p-2  hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors  group-hover:opacity-100"
            title="Delete todo"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <AllTodos category={List} />
      </div>
    </div>
  );
};

export default Home;

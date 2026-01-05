// createList.jsx
import { X } from "lucide-react";

const CreateList = ({ onClose, setSelectedList, setSelectedListTitle }) => {
  const HandleSubmit = (e) => {
    e.preventDefault();
    const listName = e.target.listName.value;
    const newList = { name: listName };
    fetch("http://localhost:5000/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newList),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("List created:", data);
        setSelectedList(data._id);
        setSelectedListTitle(data.name);

        window.dispatchEvent(new CustomEvent("listCreated", { detail: data }));
        e.target.listName.value = "";
        if (onClose) onClose();
      })
      .catch((error) => {
        console.error("Error creating list:", error);
      });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#2d2e30] rounded-lg shadow-2xl w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-medium text-white">Create New List</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form className="CreateList p-6" onSubmit={HandleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="listName"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              List Name
            </label>
            <input
              type="text"
              id="listName"
              name="listName"
              required
              className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="Enter list name..."
              autoFocus
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              Create List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateList;

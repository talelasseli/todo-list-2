import { useEffect, useState } from "react";
import CreateTodo from "./Create";
import useFetch from "./useFetch.jsx";
import SideBarElement from "./sideBarElement";
import CreateList from "./createList.jsx";
import {
  Menu,
  CheckCircle,
  Star,
  Plus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const NavBar = ({ setSelectedList, setSelectedListTitle, selectedList }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [showCreateList, setShowCreateList] = useState(false);
  const { data, loading, error, refetch } = useFetch(
    "http://localhost:5000/categories"
  ); // 🔑 Get refetch
  const [listsExpanded, setListsExpanded] = useState(true);

  // 🔑 Refetch lists when a new list is created
  useEffect(() => {
    const handleListCreated = (event) => {
      console.log("List created, refetching...", event.detail);
      refetch(); // 🔑 Trigger refetch
    };
    const handleListDeleted = (event) => {
      console.log("List deleted, refetching...", event.detail);
      refetch(); // 🔑 Trigger refetch
    };
    window.addEventListener("listDeleted", handleListDeleted);
    window.addEventListener("listCreated", handleListCreated);
    return () => {
      window.removeEventListener("listCreated", handleListCreated);
      window.removeEventListener("listDeleted", handleListDeleted);
    };
  }, [refetch]);

  if (loading)
    return (
      <div className="w-64 h-screen bg-[#202124] text-white flex items-center justify-center">
        <div className="text-sm text-gray-400">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="w-64 h-screen bg-[#202124] text-white flex items-center justify-center">
        <div className="text-sm text-red-400">Error: {error}</div>
      </div>
    );

  return (
    <div className="NavBar w-64 h-screen bg-[#202124] text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <CheckCircle size={24} className="text-blue-500" />
          <h1 className="text-xl font-normal">Todo List</h1>
        </div>
      </div>

      {/* Create Button */}
      <div className="px-4 py-2">
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#2d2e30] hover:bg-[#3c3d40] rounded-full transition-colors w-full"
        >
          <Plus size={20} />
          <span className="text-sm">Create</span>
        </button>
      </div>

      {showCreate && (
        <CreateTodo
          open={true}
          onClose={() => setShowCreate(false)}
          selectedList={selectedList}
          list={selectedList}
        />
      )}

      {/* Navigation Items */}
      

      {/* Lists Section */}
      <div className="mt-6  overflow-y-auto">
        <div
          onClick={() => setListsExpanded(!listsExpanded)}
          className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-700 rounded transition-colors"
        >
          <span className="text-sm font-medium text-gray-400">Lists</span>
          {listsExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {listsExpanded && (
          <div className="lists mt-2">
            {data &&
              data.map((list) => (
                <SideBarElement
                  key={list._id}
                  title={list.name}
                  setSelectedList={setSelectedList}
                  elemId={list._id}
                  isSelected={selectedList === list._id}
                  setSelectedListTitle={setSelectedListTitle}
                />
              ))}
          </div>
        )}
      </div>

      <button
        onClick={() => setShowCreateList(true)}
        className="flex items-center gap-2 px-4 py-2.5 w-full text-left hover:bg-gray-700 rounded transition-colors mt-2 text-gray-300"
      >
        <Plus size={18} />
        <span className="text-sm">Create new list</span>
      </button>

      {showCreateList && (
        <CreateList
          open={true}
          onClose={() => setShowCreateList(false)}
          setSelectedList={setSelectedList}
          setSelectedListTitle={setSelectedListTitle}
        />
      )}
    </div>
  );
};

export default NavBar;

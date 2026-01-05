// sideBarElement.jsx
import { List } from "lucide-react";
import { Trash2 } from "lucide-react";

const SideBarElement = ({
  title,

  setSelectedList,
  elemId,
  isSelected,
  count,
  setSelectedListTitle,
}) => {
  const handleClick = () => {
    console.log("Selected List Title:", title);
    console.log("Selected List ID:", elemId);

    setSelectedList(elemId);

    setSelectedListTitle(title);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-between w-full px-4 py-2.5 cursor-pointer rounded-full transition-colors text-left ${
        isSelected
          ? "bg-blue-700 text-white"
          : "hover:bg-gray-700 text-gray-300"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-4 h-4 border-2 rounded ${
            isSelected ? "border-white bg-white" : "border-gray-500"
          }`}
        >
          {isSelected && (
            <svg
              className="w-full h-full text-blue-700"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M13 4L6 11L3 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <span className="text-sm">{title}</span>
      </div>
      {count !== undefined && count > 0 && (
        <span className="text-xs text-gray-400">{count}</span>
      )}
    </div>
  );
};

export default SideBarElement;

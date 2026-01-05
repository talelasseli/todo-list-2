// App.jsx
import { useState } from "react";
import NavBar from "./navBar.jsx";
import Home from "./Home.jsx";
import "./App.css";

function App() {
  const [selectedList, setSelectedList] = useState("695a5bff4285cd153ad6a067");
  const [selectedListTitle, setSelectedListTitle] = useState("My Tasks");

  return (
    <div className="App flex h-screen bg-[#1a1a1a] overflow-hidden">
      {/* Sidebar */}
      <NavBar
        setSelectedList={setSelectedList}
        setSelectedListTitle={setSelectedListTitle}
        selectedList={selectedList}
      />

      {/* Main Content Area */}
      <div className="main-content flex-1 overflow-hidden">
        {console.log("Selected List in App:", selectedList)}
        <Home
          List={selectedList}
          selectedListTitle={selectedListTitle}
          setSelectedList={setSelectedList}
          setSelectedListTitle={setSelectedListTitle}
        />
      </div>
    </div>
  );
}

export default App;

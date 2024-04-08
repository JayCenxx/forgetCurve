import React, { useState } from "react";
import { FiMenu, FiX, FiHome } from "react-icons/fi"; // Assuming these are the icons you want to use
import MenuItem from "./MenuItem";
import { FaLayerGroup } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

const CollapsibleMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <main className="relative pr-6 sm:hidden ">
      {/* Menu Icon - This icon will toggle the menu */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-xl text-gray-700 hover:text-gray-900 rounded-full p-2 border-gray-300 shadow-lg cursor-pointer  focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
      >
        {isExpanded ? <FiX /> : <FiMenu />}{" "}
        {/* Toggle between open and close icons */}
      </button>

      {/* Expanded Menu , set the menu 3/4 width of VP*/}
      <section
        className={`${isExpanded ? "fixed" : "hidden"} 
        inset-y-0 left-0 w-3/4 h-screen bg-white shadow-md z-10 overflow-y-auto`}
      >
        {/* Close Icon */}
        <button
          onClick={() => setIsExpanded(false)}
          className="text-xl text-gray-700 hover:text-gray-900 rounded-full p-2  m-4  border border-gray-300 shadow-lg cursor-pointer  focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
          <FiX /> {/* Icon to close the menu */}
        </button>


        {/* myset */}
        <div className="shadow-md rounded-lg">
        <MenuItem icon={<FaLayerGroup />} text="My Sets" />
        </div>

        {/* Add Button */}
        <div className="shadow-md rounded-lg">
        <MenuItem icon={<FiPlus />} text="New" />
        </div>
      </section>
    </main>
  );
};

export default CollapsibleMenu;

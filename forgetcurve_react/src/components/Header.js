import React from "react";
import { FiPlus } from "react-icons/fi";
import { FaLayerGroup } from "react-icons/fa";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <main className="bg-white shadow flex justify-between items-center px-6 py-4">
      {/* home title  */}
      <section className="flex items-center space-x-3">
        <h1 className="text-xl font-bold text-blue-600">Unitycard</h1>
        {/* ... Other elements like menu or logo */}
      </section>

      {/* button collection */}
      <section className="px-6 flex items-center justify-start space-x-3 ">

        {/* my set button */}
        <button className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-full   shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <FaLayerGroup className="text-lg" />
          <span className="ml-2 font-medium text-sm text-gray-800">My Sets</span>
        </button>

         {/* Add Button */}
         <button className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-full   shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <FiPlus className="text-lg " />
          <span className="ml-2 font-medium text-sm text-gray-800">New</span>
        </button>
      </section>

      {/* search bar */}
      <section className="flex-grow px-3 ">
        <SearchBar></SearchBar>
      </section>

     
      <section className="flex items-center space-x-3">
         {/*Login Button */}
      <button className="flex items-center justify-center p-2 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 h-12 w-12">
        <span className="font-medium text-sm text-gray-800">Login</span>
        </button>
      </section>
    </main>
  );
};

export default Header;

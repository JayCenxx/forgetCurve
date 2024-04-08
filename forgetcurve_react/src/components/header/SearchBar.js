import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);

  // Use an effect to focus the input when isExpanded becomes true
  useEffect(() => {
    if (isExpanded) {
      inputRef.current.focus();
    }
  }, [isExpanded]); // Only re-run the effect if isExpanded changes

  return (
    <main className="relative ">
      {/* Search Icon */}

      <section
        className=" flex items-center absolute inset-y-0  pl-2 "
        // when the search icon is clicked, it ll expand the search bar
        onClick={() => setIsExpanded(true)}>
            {/* when hover your mouse over, the background ll turn gray cicle, and mouse turn into index-finger sticking out */}
        <div className=" w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200">
          <FiSearch className="text-gray-600 w-5 h-5  " />
        </div>
      </section>

      {/* Search Input */}
      <input
      // Attach the ref to the input
        ref={inputRef} 
        className={`pl-12  py-2  rounded-full transition-all delay-100 duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 
        ${ isExpanded ? "w-10/12" : "hidden"}  `}
        placeholder="Search"
        // when you click somewhere else, the search bar will unshrink
        onBlur={() => setIsExpanded(false)}
        style={{ minWidth: isExpanded ? "150px" : "0px" }}
      />
    </main>
  );
};

export default SearchBar;


import { useEffect, useRef, useState } from "react";
import { dropDownStores } from "../stores/mainStores";


const DropdownMenu = () => {
    const { isOpen, setIsOpen } = dropDownStores(state => ({ isOpen: state.isOpen, setIsOpen: state.setIsOpen }));
    const dropdownRef = useRef(null);
  
    // Handle clicks outside the dropdown to close it
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [dropdownRef]);
  
    return (
      <main className="relative" ref={dropdownRef}>
  
        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute mt-1 w-auto rounded-md shadow-lg bg-white z-10">
            <ul className="py-1 text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Created</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Name</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Last Updated</li>
            </ul>
          </div>
        )}
      </main>
    );
  };
  
  export default DropdownMenu;
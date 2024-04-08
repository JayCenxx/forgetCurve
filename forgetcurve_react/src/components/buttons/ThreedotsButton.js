import React, { useState, useRef, useEffect } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

const ThreedotsButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <main className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="p-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        <FaEllipsisV className="text-gray-800" />
      </button>
      {isOpen && (
        <div className="absolute right-0 w-max py-2  bg-white rounded-md shadow-xl z-10">
          <a href="#" className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100">Edit</a>
          <a href="#" className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100">Rename</a>
          <a href="#" className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100">Share</a>
        </div>
      )}
    </main>
  );
};

export default ThreedotsButton;
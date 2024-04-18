import React, { useState, useRef, useEffect } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { cardButtonStyle  } from '../../style/styles';

const ThreedotsButton = ({ Icon = FaEllipsisV, Name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (isOpen && ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

  
    if (isOpen) {
       // Add event listener when dropdown is open
      document.addEventListener('click', handleClickOutside, true);
        //a clean up function to remove event listener when compo unmounts or before the effect run again
      return () => document.removeEventListener('click', handleClickOutside, true);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(isOpen => !isOpen)}
        className={Name ? `${cardButtonStyle.card_Container} ${cardButtonStyle.colorRing}` : 'p-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400'}
      >
        {Name && <span className={cardButtonStyle.card_span}>{Name}</span>}
        <Icon className="text-gray-800" />
      </button>
      {isOpen && (
        <div className="absolute right-0 w-max py-2 bg-white rounded-md shadow-xl z-10">
          <a href="#" className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100">Edit</a>
          <a href="#" className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100">Rename</a>
          <a href="#" className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100">Share</a>
        </div>
      )}
    </div>
  );
};

export default ThreedotsButton;
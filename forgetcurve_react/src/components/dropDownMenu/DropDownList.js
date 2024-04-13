import React from 'react';

const DropDownList = ({ code, onClick }) => (
    <li
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-wrap w-full"
      onClick={() => onClick(code.language, code.langCode)}
    >
      {code.language}
    </li>
  );
  
  export default DropDownList; 
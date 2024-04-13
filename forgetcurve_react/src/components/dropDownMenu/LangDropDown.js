import { useState } from "react";
import { langCodeArray } from "../../utils/LangCodeArray";
import { setLangCodeServ } from "../../services/langCodeServ";

const LangDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Select Language');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (language,langCode) => {
    // selected li
    setSelected(language);
    // close the dropdown after selecting one
     setIsOpen(false);
    // send the data via services.
    setLangCodeServ(langCode)
  
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className=" text-black px-4 py-2 rounded focus:outline-none focus:shadow-outline">
        {selected}
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
          <ul className="py-1 text-gray-700">
            {langCodeArray.map((code,index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer wrap"
                onClick={() => handleItemClick(code.language,code.langCode)} >
                {code.language}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LangDropdown;

import { useEffect, useRef, useState } from "react";
import { langCodeArray } from "../../utils/LangCodeArray";
import useLangCodeStore from "../../stores/useLangCodeStore";
import DropDownList from "./DropDownList";

const LangDropdown = ({ isAutoDetectFront }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select Language");
  const setFrontLangCode = useLangCodeStore((i) => i.setFrontLangCode);
  const setBackLangCode = useLangCodeStore((i) => i.setBackLangCode);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const refs = useRef();

  const handleItemClick = (language, langCode) => {
    setSelected(language);
    // close the dropdown after selecting one
    setIsOpen(false);
    // send the data via services.
    setBackLangCode(langCode);
    // say if user pick japanese then pick auto-detect again
    if (selected === "Auto-Detect" && isAutoDetectFront) {
      setFrontLangCode("auto");
    }
  };

  //i want this to happen when the page refresh, so the Front ll show Auto Detect instead of Select Language
  useEffect(() => {
    if (isAutoDetectFront) {
      setSelected("Auto-Detect");
      
    }
    setBackLangCode("en");
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // when user open the dropdown menu, if they click else where, it ll close the dropdown
      if (refs.current && !refs.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    // cleanup function when this compo demount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  // front ll have Auto-Detect,  back will ll skip the 1st elem =auto-detect
  const listItems = isAutoDetectFront ? langCodeArray : langCodeArray.slice(1);
  return (
    <main className="relative" ref={refs}>
      <button
        onClick={toggleDropdown}
        className=" text-black px-6 rounded focus:outline-none focus:shadow-outline"
      >
        {selected}
      </button>

      {/* togleDropdown button above when click,it flip isOpen from false to true */}
      {isOpen && (
        <div className="absolute mt-1 rounded-md bg-white shadow-lg">
          <ul className="py-1 text-gray-700">
            {listItems.map((code, index) => (
              <DropDownList key={index} code={code} onClick={handleItemClick} />
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default LangDropdown;

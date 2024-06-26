// LangDropDown.js
import { useEffect, useRef, useState } from "react";
import { langCodeArray } from "../../assets/LangCodeArray";
import useLangCodeStore from "../../stores/useLangCodeStore";
import DropDownList from "./DropDownList";

const LangDropdown = ({ isAutoDetectFront }) => {
  const [isOpen, setIsOpen] = useState(false);
const { backLangCode, frontLangCode, setFrontLangCode, setBackLangCode } = useLangCodeStore();
  const toggleDropdown = () => setIsOpen(!isOpen);
  const refs = useRef();

   const handleItemClick = (language, langCode) => {
// language is like "english" display text, langCode is 'en' for ex
    setIsOpen(false);
    if (isAutoDetectFront) {
      setFrontLangCode({language: language,langCode: langCode });
    } else {
      setBackLangCode({language: language,langCode: langCode });
    }
  };

  //i want this to happen when the page refresh, so the Front ll show Auto Detect instead of Select Language
 

  useEffect(() => {
    const handleClickOutside = (e) => {
      // refs.current is pointing at <button>, it's not the parent of the language, so if u click anywhere else, it ll close the model. 
      if (!refs.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

const selected= isAutoDetectFront?frontLangCode.language : backLangCode.language;

  // front ll have Auto-Detect,  back will ll skip the 1st elem =auto-detect
  const listItems = isAutoDetectFront ? langCodeArray : langCodeArray.slice(1);
  return (
    <main >
      <button
        ref={refs}
        onClick={toggleDropdown}
        className=" text-black px-6 rounded focus:outline-none focus:shadow-outline">
        {
        selected
        }
      </button>

      {isOpen && (
        // Overlay that covers the entire screen
        <section
          className="fixed inset-0 z-10 "
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          {/* Centered container for the dropdown, can add xl:h-auto but not ideal */}
          <div
            className=" fixed inset-0 m-auto w-[60vw] max-h-[60%] h-[60%]   p-6 overflow-auto rounded-md bg-white shadow-lg "
            style={{
              maxHeight: 'fit-content',
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <ul className=" text-gray-700 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 content-center">
              {listItems.map((code, index) => (
                <DropDownList
                  key={index}
                  code={code}
                  onClick={handleItemClick}
                />
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
};

export default LangDropdown;

import { useEffect, useRef, useState } from "react";
import { langCodeArray } from "../../utils/LangCodeArray";
import useLangCodeStore from "../../stores/useLangCodeStore";

const LangDropdown = ({isAutoDetectFront}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select Language");
  const setFrontLangCode=useLangCodeStore((i) => i.setFrontLangCode);
  const setBackLangCode = useLangCodeStore((i) => i.setBackLangCode);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const refs = useRef();


  const handleItemClick = (language, langCode) => {
    // selected li
    setSelected(language);
    // close the dropdown after selecting one
    setIsOpen(false);
    // send the data via services.
    setBackLangCode(langCode);
    // say if user pick japanese then pick auto-detect again
    if(selected==="Auto-Detect" &&isAutoDetectFront){
      setFrontLangCode("auto")
    }
  };

//i want this to happen when the page refresh, so the Front ll show Auto Detect instead of Select Language
useEffect(()=>{
  if(isAutoDetectFront) {
    setSelected('Auto-Detect')
  }
  setBackLangCode('en')
},[])

  useEffect(() => {
    const handleClickOutside = (e) => {
      console.log(refs.current);
      if (refs.current && !refs.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      console.log("hey");
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <main className="relative" ref={refs}>
      <button
        onClick={toggleDropdown}
        className=" text-black px-6 rounded focus:outline-none focus:shadow-outline">
        { selected}
      </button>

      {/* togleDropdown button above, flip isOpen from false to true */}
      {isOpen && (
        <div className="absolute mt-1 rounded-md bg-white shadow-lg ">
          <ul className="py-1 text-gray-700">
            {/* if auto===true, then pick this */}
            {langCodeArray.map((code, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-wrap w-full"
                onClick={() => handleItemClick(code.language, code.langCode)}
              >
                {code.language}
              </li>
            ))}

            {/* else pick this */}

          </ul>
        </div>
      )}
    </main>
  );
};

export default LangDropdown;

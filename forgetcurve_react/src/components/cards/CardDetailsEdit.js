// CardDetailsEdit.js
import React, { useEffect, useState } from "react";
import translateServ from "../../services/translationServ";
import LangDropdown from "../dropDownMenu/LangDropDown";
import useLangCodeStore from "../../stores/useLangCodeStore";
import { IoSwapHorizontal } from "react-icons/io5";

const CardDetailsEdit = () => {
  const [frontText, setFrontText] = useState("hi there");
  const [backText, setBackText] = useState("hi how are you");
const backLangCode=useLangCodeStore(i=>i.backLangCode)
const frontLangCode=useLangCodeStore(i=>i.frontLangCode)
const setFrontLangCode = useLangCodeStore(state => state.setFrontLangCode);
const setBackLangCode = useLangCodeStore(state => state.setBackLangCode);

const handleSwap=()=>{
  // swap text
  setFrontText(backText);
  setBackText(frontText)
// swap langugage & langCode
  setFrontLangCode(backLangCode)
  setBackLangCode(frontLangCode)
}


 //need the frontText & target translated language type
  const handleTranslation = async (frontText, frontLangCode, backLangCode) => {
 
    try {
      const result = await translateServ(frontText, frontLangCode, backLangCode);
      setBackText(result.translatedText);
    } catch (error) {
      console.error("Error at handling translation:", error);
    }
  };

  return (
    <main className=" p-4 rounded-lg shadow-lg w-10/12 mx-auto bg-white">
      {/* create a flex container */}
      <section>
        {/* send backText the langcode backText to this button  */}
        <button onClick={() => handleTranslation(frontText, frontLangCode.langCode,backLangCode.langCode)}>
          translate
        </button>
      </section>

      <section className="flex items-center">
        {/* frontText */}
        <div className="flex flex-col basis-6/12">
          <input
            type="text"
            className="mr-2 p-1 border-b-2 border-dash focus:outline-none flex-grow"
            value={frontText}
            onChange={e => setFrontText(e.target.value)}
            placeholder="Front"
          />
          <div className="flex justify-between">
              <h1 className="ml-1 text-gray-500">Front</h1>
              <LangDropdown isAutoDetectFront={true}/>
          </div>
        </div>
        <div className="mr-6 ml-4">
          <button onClick={handleSwap}>
          <IoSwapHorizontal/>
          </button>
        </div>
        {/* backText */}
        <div className="flex flex-col basis-5/12">
          <input
            type="text"
            className="mr-2 p-1 border-b-2 border-dash focus:outline-none flex-grow"
            value={backText}
            onChange={e => setBackText(e.target.value)}
            placeholder="Back"
          />
          <div className="flex justify-between">
          <h1 className="ml-1 text-gray-500">Back</h1>

          <LangDropdown/>
          </div>
        </div>

        {/* upload photo*/}
        <div className="p-2">
          {/* Replace with your actual image icon */}
          <img
            src="/path-to-your-image-icon.svg"
            alt="Edit"
            className="h-6 w-6"
          />
        </div>
      </section>
    </main>
  );
};

export default CardDetailsEdit;

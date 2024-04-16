// CardDetailsEdit.js
import React, { useCallback, useEffect, useState } from "react";
import translateServ from "../../services/translationServ";
import LangDropdown from "../dropDownMenu/LangDropDown";
import useLangCodeStore from "../../stores/useLangCodeStore";
import { IoSwapHorizontal } from "react-icons/io5";
import { findLanguageWithLangCode } from "../../utils/LangCodeArray";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const CardDetailsEdit = () => {
  
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const {backLangCode,frontLangCode,setFrontLangCode,setBackLangCode} = useLangCodeStore();
  const isFrontTextEmpty = frontText.trim() === "";
  const isBackTextEmpty = backText.trim() === "";

  

  const handleSwap = () => {
    // the back end code also need to check this condition, in case hacker change the frontend code. 
    if(isFrontTextEmpty && isBackTextEmpty){
      return 
    }
    // Temporary variables to hold the new values
    const newFrontLangCode = backLangCode;
    let newBackLangCode = frontLangCode;
  
    // Check if the language was auto-detected and update accordingly
    if (frontLangCode.language === "Auto-Detect") {
      // when the swap button is pressed, assume it detected its English, i want to replace Auto-Detect with English
      //swap to the back, ex. Japanese - English,  instead of  Japanese - Auto Detect
      newBackLangCode = {
        ...frontLangCode,
        language: findLanguageWithLangCode(frontLangCode.langCode),
      };
    }
    // Set the new values to state
    setFrontText(backText);
    setBackText(frontText);
    setFrontLangCode(newFrontLangCode);
    setBackLangCode(newBackLangCode);
  };
  
useEffect(() => {},[frontLangCode])

  //need the frontText & target translated language type
  const handleTranslation =useCallback( async (
    tempFrontText,
    tempfrontLangCode,
    tempbackLangCode) => {
    try {
       // the back end code also need to check this condition, in case hacker change the frontend code. 
      if(isFrontTextEmpty){
        return;
      }
      const result = await translateServ(
        tempFrontText,
        tempfrontLangCode,
        tempbackLangCode
      );
      // if it's Not auto-detect it wont have .front
      if (!result.front) {
        // langCode ex 'en' ll be return, just wanna store it somewhere, so i can find "english" in the array
        setFrontLangCode({
          ...frontLangCode,
          langCode: result.detectedLanguageCode,
        });
      }

      setBackText(result.translatedText);
    } catch (error) {
      console.error("Error at handling translation:", error);
      alert("Translation failed. Please try again later.");
    }
  },[isFrontTextEmpty])

  return (
    <main className=" p-4 rounded-lg shadow-lg w-10/12 mx-auto bg-white">
        <div className="text-editor">

    </div>
      {/* create a flex container */}
      <main className="flex items-center">

        {/* frontText */}
        <section className="flex flex-col basis-6/12">
     
          <input
            type="text"
            className="mr-2 p-1 border-b-2 border-dash focus:outline-none flex-grow"
            value={frontText}
            onChange={(e) => setFrontText(e.target.value)} 
            placeholder=""
          />
          
          <div className="flex justify-between">
            <h1 className="ml-1 text-gray-500">Front</h1>
            <LangDropdown isAutoDetectFront={true} />
          </div>
        </section>
        <section className="mr-6 ml-4 text-xl">
          <button onClick={handleSwap} className={`${isFrontTextEmpty && isBackTextEmpty ? 'text-gray-500' : 'text-black'} `} >
            <IoSwapHorizontal />
          </button>
        </section>
        {/* backText */}
        <section className="flex flex-col basis-6/12">
          <input
            type="text"
            className="mr-2 p-1 border-b-2 border-dash focus:outline-none flex-grow"
            value={backText}
            onChange={(e) => setBackText(e.target.value)}
            placeholder=""
          />
         
          <div className="flex justify-between">
            <h1 className="ml-1 text-gray-500">Back</h1>

            <LangDropdown />
          </div>
        </section>

        <section>
          {/* send backText the langcode backText to this button  */}
          <button
            onClick={() =>
              handleTranslation(
                frontText,
                frontLangCode.langCode,
                backLangCode.langCode )}
                className={`${isFrontTextEmpty ? 'text-gray-500' : 'text-black'} `}
            >
            translate
          </button>
        </section>
      </main>
    </main>
  );
};

export default CardDetailsEdit;

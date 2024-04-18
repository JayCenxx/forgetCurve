// CardDetailsEdit.js
import React, { useCallback, useEffect, useState } from "react";
import translateServ from "../../services/translationServ";
import LangDropdown from "../dropDownMenu/LangDropDown";
import useLangCodeStore from "../../stores/useLangCodeStore";
import { IoSwapHorizontal } from "react-icons/io5";
import { findLanguageWithLangCode } from "../../utils/LangCodeArray";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { MyEditor } from "../richTextEditor/MyEditor";
import { Toolbar } from "../richTextEditor/Toolbar";
import { debounce } from "../../utils/debounce";
const CardDetailsEdit = () => {
  

  const [frontText, setFrontText] = useState(`<p></p><p></p>`);
  const [backText, setBackText] = useState(`<p></p><p></p>`);
  const {backLangCode,frontLangCode,setFrontLangCode,setBackLangCode} = useLangCodeStore();
  const isFrontTextEmpty = frontText.trim() === "";
  const isBackTextEmpty = backText.trim() === "";

  const [activeEditor, setActiveEditor] = useState(null);

  const handleEditorFocus = (editor) => {
    setActiveEditor(editor);
  };

  const handleFrontTextEditor = useCallback(debounce(content => {
    setFrontText(content);
    console.log(frontText);
  }, 500), []); // 500 ms delay

  const handleBackTextEditor = (content) => {
    setBackText(content);
  };

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
  
useEffect(() => {},[frontLangCode,backText])
  //need the frontText & target translated language type
  const handleTranslation = useCallback(async () => {
    if (isFrontTextEmpty) return;
    
    try {
      const result = await translateServ(frontText, frontLangCode.langCode, backLangCode.langCode);
      if (!result.front) {
        setFrontLangCode({
          ...frontLangCode,
          langCode: result.detectedLanguageCode,
        });
      }
      setBackText(result.translatedText); // This updates the backText state
    } catch (error) {
      console.error("Error at handling translation:", error);
      alert("Translation failed. Please try again later.");
    }
  }, [frontText, frontLangCode, backLangCode, isFrontTextEmpty]);



  return (
    <main className=" p-4 rounded-lg shadow-lg w-10/12 mx-auto bg-white">
        <div className="text-editor">
        <Toolbar activeEditor={activeEditor} setActiveEditor={setActiveEditor} />
    </div>
      {/* create a flex container */}
      <main className="flex items-center">

        {/* frontText */}
        <section className="flex flex-col basis-6/12">
     
   
          
          <MyEditor
        editorContent={frontText}
        onEditorFocus={handleEditorFocus}
        changeContent={handleFrontTextEditor}
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

           <MyEditor
        editorContent={backText}
        onEditorFocus={handleEditorFocus}
        changeContent={handleBackTextEditor}
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

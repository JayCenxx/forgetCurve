// CardDetailsEdit.js
import React, { useCallback, useEffect, useRef, useState } from "react";
import translateServ from "../../services/translationServ";
import LangDropdown from "../dropDownMenu/LangDropDown";
import useLangCodeStore from "../../stores/useLangCodeStore";
import { IoSwapHorizontal } from "react-icons/io5";
import { findLanguageWithLangCode } from "../../utils/LangCodeArray";
import { MyEditor } from "../richTextEditor/MyEditor";
import { Toolbar } from "../richTextEditor/Toolbar"; 
import useCardArrayStore from "../../stores/useCardArrayStore";
import { IoArrowUpSharp,IoArrowDownSharp,IoMove } from "react-icons/io5";

import { FaRegTrashCan } from "react-icons/fa6";



export const EditCardDetails = ({ itemId, index2 }) => {
  const {
    cardArray,addNewCardJSX, removeCardJSX,
    moveCardJSX,setFrontText, setBackText,
  } = useCardArrayStore();
  const { backLangCode, frontLangCode, setFrontLangCode, setBackLangCode } =
    useLangCodeStore();
    // only pull the frontText & backText 
  const { frontText, backText } = cardArray[index2];
  const isFrontTextEmpty = frontText.trim() === "";
  const isBackTextEmpty = backText.trim() === "";
  const [activeEditor, setActiveEditor] = useState(null);

  let isAutoDetect = frontLangCode.language === "Auto-Detect" 
                      && frontLangCode.langCode === "auto";

  const handleEditorFocus = (editor) => {
    setActiveEditor(editor);
  };

  // this number have to stay at 100ms, otherwise it ll have swapping problem, or it ll get trigger way too many times per char type
  const handleFrontTextEditor = (content) => {
    setFrontText(index2, content); 
  }
 
  const handleBackTextEditor = (content) => { 
    setBackText(index2, content);
  }

  const handleClickFront = () => {
    isLengthBiggerThanOne(frontText);
  };

  const handleClickBack = () => {
    isLengthBiggerThanOne(backText);
  };

  const isLengthBiggerThanOne = () => {
    // if either front or backText more than 1 character & it's the last CardDetail JSX then to add another JSX
    if (index2 === cardArray.length - 1) {
      addNewCardJSX();
    }
  }
  
  const handleSwap = () => {
    // Temporary variables to hold the new values
    const newFrontLangCode = backLangCode;
    let newBackLangCode = frontLangCode;
  
    // Check if the language was auto-detected and update accordingly
    if (frontLangCode.language === "Auto-Detect") {
      newBackLangCode = {
        ...frontLangCode,
        language: findLanguageWithLangCode(frontLangCode.langCode),
      };
    }
    // Set the new values to state
    setFrontText(index2, backText);
    setBackText(index2, frontText);
    setFrontLangCode(newFrontLangCode);
    setBackLangCode(newBackLangCode);
  };

  useEffect(() => {}, [frontLangCode, backText,frontText]);
  //need the frontText & target translated language type

  const handleTranslation = useCallback(async () => {
    if (isFrontTextEmpty) return;

    try {
      const result = await translateServ(
        frontText,
        frontLangCode.langCode,
        backLangCode.langCode
      );

      if (!result.front) {
        setFrontLangCode({
          ...frontLangCode,
          langCode: result.detectedLanguageCode,
        });
      }
      setBackText(index2,result.translatedText); // This updates the backText state
    } catch (error) {
      console.error("Error at handling translation:", error);
      alert("Translation failed. Please try again later.");
    }
  }, [frontText, backText, frontLangCode, backLangCode, isFrontTextEmpty]);

  return (
    <main className=" p-4 rounded-lg shadow-lg w-9/12 mx-auto bg-white my-8">
      <section className="text-editor flex space-x-2">
        <div>
          <Toolbar
            activeEditor={activeEditor}
            setActiveEditor={setActiveEditor}
          />
        </div>

        <div>
          <button onClick={() => removeCardJSX(itemId)} className="text-xl">
            <FaRegTrashCan/> 
            </button>

            <button className="text-xl" onClick={()=>document.getElementById('my_modal_2').showModal()}>
              <IoMove/>
            </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click outside to close</p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

          {/* <input
            onChange={(e) =>
              moveCardJSX(index2, parseInt(e.nativeEvent.data) - 1)
            }
            placeholder="Move to specific index"
          /> */}

          <button
            onClick={() => moveCardJSX(index2, index2 - 1)}
            disabled={index2 === cardArray.length}
          >
            <IoArrowUpSharp className="text-xl"/>
          </button>
          <button
            onClick={() => moveCardJSX(index2, index2 + 1)}
            disabled={index2 === cardArray.length}
          >
            <IoArrowDownSharp className="text-xl"/>
          </button>
        </div>
      </section>



      {/* create a flex container */}
      <main className="flex items-center">
        {/* frontText */}
        <section className="flex flex-col basis-6/12">
        <div onClick={handleClickFront}>
          <MyEditor
            editorContent={frontText}
            onEditorFocus={handleEditorFocus}
            changeContent={handleFrontTextEditor}
          />
        </div>
          <div className="flex justify-between">
            <h1 className="ml-1 text-gray-500">Front</h1>
            <LangDropdown isAutoDetectFront={true} />
          </div>
        </section>

        <section className="mr-6 ml-4 text-xl">
          <button
            onClick={handleSwap}
            className={`${
              isFrontTextEmpty && isBackTextEmpty
                ? "text-gray-500"
                : "text-black"
            } `}
            disabled={isAutoDetect || (isFrontTextEmpty && isBackTextEmpty)}
          >
            <IoSwapHorizontal />
          </button>
        </section>
        {/* backText */}
        <section className="flex flex-col basis-6/12">

        <div onClick={handleClickBack}>
          <MyEditor
            editorContent={backText}
            onEditorFocus={handleEditorFocus}
            changeContent={handleBackTextEditor}
          />
</div>
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
                backLangCode.langCode
              )
            }
            className={`${isFrontTextEmpty ? "text-gray-500" : "text-black"} `}
          >
            translate
          </button>
        </section>
      </main>
    </main>
  );
};

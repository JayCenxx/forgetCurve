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
import { IoArrowUpSharp, IoArrowDownSharp, IoMove } from "react-icons/io5";

import { FaRegTrashCan } from "react-icons/fa6";
import { MoveModal } from "../modal/MoveModal";


export const EditCardDetails = ({ itemId, index2 }) => {
  const {
    cardArray,
    addNewCardJSX,
    removeCardJSX,
    moveCardJSX,
    setFrontText,
    setBackText,
  } = useCardArrayStore();
  const { backLangCode, frontLangCode, setFrontLangCode, setBackLangCode ,setCardArray} =
    useLangCodeStore();
  // only pull the localFrontText & localBackText
  const { frontText, backText } = cardArray[index2];
  const [localFrontText,setLocalFrontText]=useState("")
  const [localBackText,setLocalBackText]=useState("")
  const isFrontTextEmpty = localFrontText.trim() === "";
  const isBackTextEmpty = localBackText.trim() === "";
  const [activeEditor, setActiveEditor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let isAutoDetect =
    frontLangCode.language === "Auto-Detect" &&
    frontLangCode.langCode === "auto"; 
     

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };


    useEffect(() => {
    
      console.log(cardArray)
    }, [cardArray]);

  const handleEditorFocus = (editor) => {
    setActiveEditor(editor);
  };

  // this number have to stay at 100ms, otherwise it ll have swapping problem, or it ll get trigger way too many times per char type
  const handleFrontTextEditor = (content) => {
    setLocalFrontText(content ); 
 

  };
  const blurSetFront = () => {
    setFrontText(localFrontText, index2 );
  };

  const handleBackTextEditor = (content) => {
    setLocalBackText(content);
  };
 

  // if last card JSX, upon click add another one
  const isLengthBiggerThanOne = () => {
    // if either front or localBackText more than 1 character & it's the last CardDetail JSX then to add another JSX
    if (index2 === cardArray.length - 1) {
      addNewCardJSX();
    }
  };

  const handleSwap = () => {
    // Temporary variables to hold the new values
    const newFrontLangCode = backLangCode;
    let newBackLangCode = frontLangCode; 
    // Check if the language was auto-detected and update based on the localFrontText
    if (frontLangCode.language === "Auto-Detect") {
      newBackLangCode = {
        ...frontLangCode,
        language: findLanguageWithLangCode(frontLangCode.langCode),
      };
    }
    // Set the new values to state
    console.log(localBackText,localFrontText);
    setLocalFrontText( localBackText);
    setLocalBackText( localFrontText);
    setFrontLangCode(newFrontLangCode);
    setBackLangCode(newBackLangCode);
  };

  //   load it once all the data from the backend Array
  useEffect(() => {
    setLocalFrontText(frontText )
    setLocalBackText(backText )
 
  }, []);

  //need the localFrontText & target translated language type
  const handleTranslation = useCallback(async () => {
    if (isFrontTextEmpty) return;

    try {
      const result = await translateServ(
        localFrontText,
        frontLangCode.langCode,
        backLangCode.langCode
      );

      if (!result.front) {
        setFrontLangCode({
          ...frontLangCode,
          langCode: result.detectedLanguageCode,
        });
      }
      setLocalBackText(index2, result.translatedText); // This updates the localBackText state
    } catch (error) {
      console.error("Error at handling translation:", error);
      alert("Translation failed. Please try again later.");
    }
  }, [localFrontText, localBackText, frontLangCode, backLangCode, isFrontTextEmpty]);



  return (
    <main className=" p-4 rounded-lg shadow-lg w-9/12 mx-auto bg-white my-8">
      <section className="text-editor flex space-x-2">
        <div>
          <Toolbar
            activeEditor={activeEditor}
            setActiveEditor={setActiveEditor} />
        </div>


        <div>
          <button onClick={() => removeCardJSX(itemId)} className="text-xl">
            <FaRegTrashCan />
          </button>
        </div>

    
        <div className="">
          <button className="text-xl" onClick={openModal}>
            <IoMove />
          </button>

          <MoveModal
            index3={index2}
            moveCardJSX={moveCardJSX}
            isOpen={isModalOpen}
            close={closeModal}
          />
        </div>

        
        <div>
          <button
            onClick={() => moveCardJSX(index2, index2 - 1)}
            disabled={index2 === cardArray.length}
          >
            <IoArrowUpSharp className="text-xl" />
          </button>
        </div>

        <div>
          <button
            onClick={() => moveCardJSX(index2, index2 + 1)}
            disabled={index2 === cardArray.length}
          >
            <IoArrowDownSharp className="text-xl" />
          </button>
        </div>
      </section>

      {/* create a flex container */}
      <main className="flex items-center">
        {/* localFrontText */}
        <section className="flex flex-col basis-6/12">
          <div onClick={isLengthBiggerThanOne} onBlur={blurSetFront}>
            <MyEditor
              editorContent={localFrontText}
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
            
          >
            <IoSwapHorizontal />
          </button>
        </section>
        {/* localBackText */}
        <section className="flex flex-col basis-6/12">
          <div onClick={isLengthBiggerThanOne}>
            <MyEditor
              editorContent={localBackText}
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
          {/* send localBackText the langcode localBackText to this button  */}
          <button
            onClick={() =>
              handleTranslation(
                localFrontText,
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

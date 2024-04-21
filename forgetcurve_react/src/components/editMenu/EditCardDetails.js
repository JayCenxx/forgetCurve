// CardDetailsEdit.js
import React, { useCallback, useEffect, useState } from "react";
import translateServ from "../../services/translationServ";
import LangDropdown from "../dropDownMenu/LangDropDown";
import useLangCodeStore from "../../stores/useLangCodeStore";
import { IoSwapHorizontal } from "react-icons/io5";
import { findLanguageWithLangCode } from "../../utils/LangCodeArray";
import { MyEditor } from "../richTextEditor/MyEditor";
import { Toolbar } from "../richTextEditor/Toolbar";
import { debounce } from "../../utils/debounce";
import { ignoreHTMLRegex } from "../../utils/ignoreHTMLRegex";
import useCardArrayStore from "../../stores/useCardArrayStore";
export const EditCardDetails = ({ itemId, index2 }) => {
  const {
    cardArray,
    addNewCardJSX,
    removeCardJSX,
    moveCardJSX,
    setFrontText,
    setBackText,
  } = useCardArrayStore();
  const { backLangCode, frontLangCode, setFrontLangCode, setBackLangCode } =
    useLangCodeStore();
  const { frontText, backText } = cardArray[index2];

  const isFrontTextEmpty = frontText.trim() === "";
  const isBackTextEmpty = backText.trim() === "";
  const [activeEditor, setActiveEditor] = useState(null);
  let isAutoDetect =
    frontLangCode.language === "Auto-Detect" &&
    frontLangCode.langCode === "auto";

  const handleEditorFocus = (editor) => {
    setActiveEditor(editor);
  };

  // this number have to stay at 100ms, otherwise it ll have swapping problem, or it ll get trigger way too many times per char type
  const handleFrontTextEditor = debounce((content) => {
    isLengthBiggerThanOne(content);

    setFrontText(index2, content);
  }, 100);

  const handleBackTextEditor = debounce((content) => {
    isLengthBiggerThanOne(content);
    setBackText(index2, content);
  }, 100);

  const isLengthBiggerThanOne = (text) => {
    // if either front or backText more than 1 character & it's the last CardDetail JSX then to add another JSX
    if (ignoreHTMLRegex(text).length >= 1 && index2 === cardArray.length - 1) {
      addNewCardJSX();
    }
  };

  const handleSwap = () => {
    // Temporary variables to hold the new values
    const newFrontLangCode = backLangCode;
    let newBackLangCode = frontLangCode;

    // Check if the language was auto-detected and update accordingly
    if (frontLangCode.language === "Auto-Detect") {
      console.log(frontLangCode);
      // when the swap button is pressed, assume it detected its English, i want to replace Auto-Detect with English
      //swap to the back, ex. Japanese - English,  instead of  Japanese - Auto Detect
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

  useEffect(() => {}, [frontLangCode, backText]);
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
    <main className=" p-4 rounded-lg shadow-lg w-9/12 mx-auto bg-white mt-14">
      <section className="text-editor flex space-x-2">
        <div>
          <Toolbar
            activeEditor={activeEditor}
            setActiveEditor={setActiveEditor}
          />
        </div>

        <div>
          <button onClick={() => removeCardJSX(itemId)}>Remove</button>
          <input
            onChange={(e) =>
              moveCardJSX(index2, parseInt(e.nativeEvent.data) - 1)
            }
            placeholder="Move to specific index"
          />
          <button
            onClick={() => moveCardJSX(index2, index2 - 1)}
            disabled={index2 === cardArray.length}
          >
            Move Up
          </button>
          <button
            onClick={() => moveCardJSX(index2, index2 + 1)}
            disabled={index2 === cardArray.length}
          >
            Move Down
          </button>
        </div>
      </section>

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

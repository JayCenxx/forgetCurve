// CardDetailsEdit.js
import React, { useCallback, useEffect, useRef, useState } from "react";
import translateServ from "../../services/translationServ";
import LangDropdown from "../dropDownMenu/LangDropDown";
import useLangCodeStore from "../../stores/useLangCodeStore";
import { MyEditor } from "../richTextEditor/MyEditor";
import { Toolbar } from "../richTextEditor/Toolbar";
import useCardArrayStore from "../../stores/useCardArrayStore";
import { IoArrowUpSharp, IoArrowDownSharp, IoMove } from "react-icons/io5";
import { BsTranslate } from "react-icons/bs";
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

  const { backLangCode, frontLangCode, setFrontLangCode } =
    useLangCodeStore(); 
    const { frontText, backText } = cardArray[index2];
    // only pull the localFrontText & localBackText
  const [localFrontText,setLocalFrontText]=useState("")
  const [localBackText,setLocalBackText]=useState("")
 const isFrontTextEmpty =localFrontText? localFrontText.trim() === "":false;
  // const isBackTextEmpty =localBackText? localBackText.trim() === "":false;
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


  const handleEditorFocus = (editor) => {
    setActiveEditor(editor);
  };

  // this number have to stay at 100ms, otherwise it ll have swapping problem, or it ll get trigger way too many times per char type
  const handleFrontTextEditor = (content) => {
    if(content)
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
 
   useEffect(()=>{
console.log(frontLangCode,backLangCode);
   },[frontLangCode,backLangCode])
   
  //need the localFrontText & target translated language type
  const handleTranslation = useCallback(async () => { 
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
      setBackText( result.translatedText,index2); // This updates the localBackText state
    } catch (error) {
      console.error("Error at handling translation:", error);
      alert("Translation failed. Please try again later.");
    }
  }, [frontText, frontLangCode, backLangCode ]);



  return (
    <main className=" p-4 rounded-lg shadow-lg w-9/12 mx-auto bg-white mb-8">
      <main className="text-editor flex space-x-2  ">
        <section className="flex basis-1/3 space-x-1">
          <div className="">
            <h1 className="text-xl -mt-1">
            { index2+1}
          </h1>
          </div>
       
        <span className="basis-[4%] "></span>
          {/* move button */}
          <div  >
            <button className="text-xl " onClick={openModal}>
              <IoMove />
            </button>

            <MoveModal
              index3={index2}
              moveCardJSX={moveCardJSX}
              isOpen={isModalOpen}
              close={closeModal} />
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
              disabled={index2 === cardArray.length} >
              <IoArrowDownSharp className="text-xl" />
            </button>
          </div>
          </section >

          <section className="basis-1/3  flex justify-center"> 
            <div  className="mr-6" >
              <Toolbar
                activeEditor={activeEditor}
                setActiveEditor={setActiveEditor} />
            </div>
          </section> 

        <section className="flex basis-1/3"> 
          <span className="basis-full"></span>
          <div>
            <button onClick={() => removeCardJSX(itemId)} className="text-xl"  disabled={  cardArray.length===1?true:false}>
              <FaRegTrashCan />
            </button>
          </div>
        </section>
      </main>


      {/* create a flex container */}
      <main className="flex items-center lg:flex-nowrap flex-wrap  ">
        {/* localFrontText */}
        <section className="flex flex-col lg:basis-6/12 basis-full">
          <div onClick={isLengthBiggerThanOne} onBlur={blurSetFront}>
            {/* it's reading the frontText from the array */}
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

     {/* <SwapButton handleSwap2={handleSwap}></SwapButton> */}
        
        <div className="basis-[2%]"></div>
        {/* localBackText */}
        <section className="flex flex-col lg:basis-6/12 basis-full">
          <div onClick={isLengthBiggerThanOne}>
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
          {/* send localBackText the langcode localBackText to this button  */}
          <button
            onClick={() => handleTranslation(
                frontText,
                frontLangCode.langCode,
                backLangCode.langCode
              )
            }
             className={`${isFrontTextEmpty ? "text-gray-500" : "text-black"} text-2xl`} >
           <BsTranslate/> 
          </button>
        </section>
      </main>
    </main>
  );
};

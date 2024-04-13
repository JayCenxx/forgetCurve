import React, { useEffect, useState } from "react";
import translateServ from "../../services/translationServ";
import { langCodeArray } from "../../utils/LangCodeArray";
import LangDropdown from "../dropDownMenu/LangDropDown";
import { getLangCodeServ } from "../../services/langCodeServ";

const CardDetailsEdit = () => {
  const [front, setFront] = useState("hi there");
  const [back, setBack] = useState("hi how are you");
  const [isSwap, setIsSwap] = useState(false);
  const [backSelectLang,setBackSelectLang]=useState("")
  // need the front & target translated language type
  const handleTranslation = async (frontText, targetLangCode) => {
    try {
      const result = await translateServ(frontText, targetLangCode);
      setBack(result.translatedText);
    } catch (error) {
      console.error("Error at handling translation:", error);
    }
  };

  return (
    <main className=" p-4 rounded-lg shadow-lg w-10/12 mx-auto bg-white">
      {/* create a flex container */}
      <section>
        {/* send back the langcode back to this button  */}
        <button onClick={() => handleTranslation(front, getLangCodeServ())}>
          translate
        </button>
      </section>

      <main className="flex items-center">
        {/* front */}
        <section className="flex flex-col flex-grow">
          <input
            type="text"
            className="mr-2 p-1 border-b-2 border-dash focus:outline-none flex-grow"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            placeholder="front"
          />
          <div className="flex justify-between">
              <h1 className="ml-1 text-gray-500">Front</h1>
              <LangDropdown/>
          </div>
        </section>
        {/* back */}

        <section className="flex flex-col flex-grow">
          <input
            type="text"
            className="mr-2 p-1 border-b-2 border-dash focus:outline-none flex-grow"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            placeholder="back"
          />
          <div className="flex justify-between">
          <h1 className="ml-1 text-gray-500">Back</h1>

          <LangDropdown/>
          </div>
        </section>

        {/* upload photo*/}
        <section className="p-2">
          {/* Replace with your actual image icon */}
          <img
            src="/path-to-your-image-icon.svg"
            alt="Edit"
            className="h-6 w-6"
          />
        </section>
      </main>
    </main>
  );
};

export default CardDetailsEdit;

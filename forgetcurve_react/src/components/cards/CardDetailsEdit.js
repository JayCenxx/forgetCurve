import React, { useEffect, useState } from "react";
import translateService from "../../services/translationService";
import { langCodeArray } from "../../utils/LangCodeArray";

const CardDetailsEdit = () => {
  const [front, setFront] = useState("hi there");
  const [back, setBack] = useState("hi how are you");
const [isSwap,setIsSwap] = useState(false)

// useEffect(() => {

// },[])

  // need the front & target translated language type
  const handleTranslation = (frontText, targetLang) => {
    try {
      console.log(frontText, targetLang);
      const translateResult = translateService(frontText, targetLang);
      setBack(translateResult);
    } catch (error) {
      // Handle the translation error, maybe set an error state and show it in the UI
      console.error("Error translating:", error);
    }
  };

  return (
    <main className=" p-4 rounded-lg shadow-lg w-10/12 mx-auto bg-white">
      {/* create a flex container */}
      <section>
      <button onClick={() => handleTranslation(front, 'zh-CN')}>
          translate
        </button>
        </section>
      <section className="flex items-center">
        <div className="flex flex-col flex-grow">
          <input
            type="text"
            className="mr-2 p-1 border-b-2 border-dash focus:outline-none flex-grow"
            value={front}
            onChange={e => setFront(e.target.value)}
            placeholder="front"
          />
          <h1 className="ml-1 text-gray-500">Front</h1>
        </div>

        <div className="flex flex-col flex-grow">
          <input
            type="text"
            className="mr-2 p-1 border-b-2 border-dash focus:outline-none flex-grow"
            value={back}
            onChange={e => setBack(e.target.value)}
            placeholder="back"
          />
          <h1 className="ml-1 text-gray-500">Back</h1>
        </div>

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

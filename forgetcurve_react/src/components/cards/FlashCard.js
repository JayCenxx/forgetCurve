import React, { useState } from 'react';
import '../../style/flashcard.css';
import TTSButtons from '../buttons/TTSButton';

function FlashCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [frontText,setFrontText] = useState('Front content here')
  const [backText,setBackText] = useState('Back content here')

  return (
    <main className="w-50 h-96 justify-center flex  mb-7">
      <main className={`w-11/12 lg:w-9/12 xl:w-1/2   h-full transition-transform duration-1000 transform preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
        <section className=" absolute w-full h-full backface-hidden bg-white rounded-xl flex justify-center items-center">
         {/* Stop event propagation to prevent the card from flipping when the button is clicked */}
          <div className="text-xl absolute top-0 right-0 p-4" onClick={e => e.stopPropagation()}>
         <TTSButtons text={frontText}/>
          </div>
          <div className="text-3xl flex justify-center items-center h-full">
           {frontText}
          </div>
        </section>

      <section className={`absolute w-full h-full backface-hidden bg-white transform rotate-y-180 ${isFlipped ? 'rotate-y-180' : ''} rounded-xl`}  onClick={() => setIsFlipped(!isFlipped)}>
          <div className="text-xl absolute top-0 right-0 p-4" onClick={e => e.stopPropagation()}>
           <TTSButtons text={backText}/>
          </div>
          <div className="text-3xl flex justify-center items-center h-full">
           {backText}
          </div>
        </section>
      </main>
    </main>
  );
}

export default FlashCard;
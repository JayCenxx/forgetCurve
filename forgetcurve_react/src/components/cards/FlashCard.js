import React, { useState } from 'react';
import '../../style/flashcard.css';
import TTSButtons from '../buttons/TTSButton';
import ArrowButtons from '../buttons/ArrowButton';
import  CardArray  from '../../utils/CardArray';

function FlashCard() {
  const card = CardArray();
  const [isFlipped, setIsFlipped] = useState(false);
  const [curPage, setCurPage] = useState(0);
  const maxPage = card.length - 1;

  const [frontText, setFrontText] = useState(card[curPage].front);
  const [backText, setBackText] = useState(card[curPage].back);

  const handleNext = () => {
    const nextPage = curPage + 1;
    if (nextPage <= maxPage) {
      setCurPage(nextPage);
      setFrontText(card[nextPage].front);
      setBackText(card[nextPage].back);
    }
  };

  const handlePrev = () => {
    const prevPage = curPage - 1;
    if (prevPage >= 0) {
      setCurPage(prevPage);
      setFrontText(card[prevPage].front);
      setBackText(card[prevPage].back);
    }
  };


  return (
    <>
    <main className="w-50 h-96 justify-center flex  mb-7">
      <main className={`w-11/12 lg:w-9/12 xl:w-1/2   h-full transition-transform duration-1000 transform preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
        <section className=" absolute w-full h-full backface-hidden bg-white rounded-xl flex justify-center items-center">
     
         {/* Stop event propagation to prevent the card from flipping when the TTS play button is clicked */}
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
    
    <ArrowButtons onLeftClick={handlePrev} onRightClick={handleNext}>
        {curPage + 1}/{maxPage + 1}
      </ArrowButtons>
    </>
  );
}

export default FlashCard;
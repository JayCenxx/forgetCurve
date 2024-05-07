 

import React, { useEffect, useState } from 'react';
import '../../style/flashcard.css';
import TTSButtons from '../buttons/TTSButton';
import ArrowButtons from '../buttons/ArrowButton'; 
import useTTStore from '../../stores/useTTStore';
import { useLocation } from 'react-router-dom';
import  {cardJson}  from '../../assets/cardJson';
import Bubble from '../buttons/Bubble';
import useFlashCardStore from '../../stores/useFlashCardStore';



function FlashCard() {
  const { card,curPage, isFlipped,  flipPage, frontText, backText,flipDuration } = useFlashCardStore();
  const location = useLocation();
  
  const {autoSpeak,cheapSynthesizeText}=useTTStore()

 
  useEffect(() => {
    if(autoSpeak===false){
    return;}
      // isflip true is front  send frontText over, false is back 
      if(isFlipped===false){
        cheapSynthesizeText(frontText)
      }else{
        cheapSynthesizeText(backText) 
      }
  },[isFlipped,location.pathname,curPage,frontText,backText,autoSpeak,cheapSynthesizeText])

  useEffect(() => {},[card,frontText,backText])
 

  return (
    <>
    <main className="w-50 h-96 justify-center flex  my-7">
      <article className={` w-11/12 lg:w-9/12 xl:w-1/2   h-full transition-transform duration-${flipDuration} transform preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`} onClick={flipPage}>
        {/* front-card, outer container */}
        <section className=" absolute   w-full h-full  backface-hidden bg-white rounded-xl flex overflow-auto flex-col" >
          <span className='grow min-h-5'>  </span>
          <div className=" text-3xl flex justify-center items-center px-4 " onClick={e=>e.stopPropagation()}>
              {/* {frontText} */}
              <Bubble text={`<p class="text-3xl">${frontText}</p>`} />
          </div>
          <span className=' grow min-h-3 '>  </span>     

          <div className='flex'>
            <span className='basis-[98%]'></span>
             {/* Stop event propagation to prevent the card from flipping when the TTS play button is clicked */}
            <div className="text-xl  pr-4 pb-1 " onClick={e => e.stopPropagation()}>
                <TTSButtons text={frontText}/>
            </div>  
          </div>
        </section>

      {/* back-card, outer container , add one more onClick={flipPage} ll prevent clicking backcard to flip to the front*/}
        <section className={`absolute w-full h-full backface-hidden bg-white transform rotate-y-180 ${isFlipped ? 'rotate-y-180' : ''} rounded-xl  flex overflow-auto flex-col`}   >
            <span className='grow min-h-5'>  </span>
            <div className="text-3xl flex justify-center items-center p-4" onClick={e=>e.stopPropagation()}>
                <Bubble text={`<p class="text-3xl">${backText}</p>`} />
            </div>
            <span className=' grow min-h-3 '>  </span>      

            <div className='flex'>
              <span className='basis-[98%]'></span>
              {/* Stop event propagation to prevent the card from flipping when the TTS play button is clicked */}
              <div className="text-xl  pr-4 pb-1 " onClick={e => e.stopPropagation()}>
                  <TTSButtons text={backText}/>
            </div>  
          </div>

        </section>
      </article>
    </main> 
 
    </>
  );
}

export default FlashCard;


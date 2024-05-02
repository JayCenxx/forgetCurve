import React, { useEffect, useState } from 'react';
import '../../style/flashcard.css';
import TTSButtons from '../buttons/TTSButton';
import ArrowButtons from '../buttons/ArrowButton'; 
import useTTStore from '../../stores/useTTStore';
import { useLocation } from 'react-router-dom';
import  {cardJson}  from '../../assets/cardJson';



function FlashCard() {
  const location = useLocation();
  const card = cardJson;
  const [isFlipped, setIsFlipped] = useState(false);
  const [curPage, setCurPage] = useState(0);
  const maxPage = card.length? card.length- 1 :0 ;

  const [frontText, setFrontText] = useState(card[curPage].frontText);
  const [backText, setBackText] = useState(card[curPage].backText);
  const[flipDuration,setFlipDuration]=useState(1000)
  const {autoSpeak,synthesizeText}=useTTStore()

  const handleNext = () => { 
    const nextPage = curPage + 1;
    updatePage(nextPage)
  };

  const handlePrev = () => { 
    const prevPage = curPage - 1;
   updatePage(prevPage)
  };

  // make it so if curPage state changes, then we set duration-1000 down to 0
  const updatePage=(newPage)=>{
    setIsFlipped(false)
    if(newPage>=0 && newPage<=maxPage){
      setFlipDuration(0) 

      setCurPage(newPage);
      setFrontText(card[newPage].frontText);
      setBackText(card[newPage].backText)
    }
    setTimeout(()=>{
      setFlipDuration(1000)
    },100)
   
  }

const flipPage=( )=>{
  setIsFlipped(!isFlipped)
}
 

  useEffect(() => {
    if(autoSpeak===false){
    return;}
    
      // isflip true is front  send frontText over, false is back 
      if(isFlipped===false){
        synthesizeText(frontText)
      }else{
        synthesizeText(backText)
      }
  },[isFlipped,location.pathname,curPage])

  useEffect(() => {},[cardJson])

  return (
    <>
    <main className="w-50 h-96 justify-center flex  my-7">
      <main className={`w-11/12 lg:w-9/12 xl:w-1/2   h-full transition-transform duration-${flipDuration} transform preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`} onClick={flipPage}>
        <section className=" absolute w-full h-full backface-hidden bg-white rounded-xl flex justify-center items-center">
     
         {/* Stop event propagation to prevent the card from flipping when the TTS play button is clicked */}
          <div className="text-xl absolute bottom-0 right-0 p-4" onClick={e => e.stopPropagation()}>
         <TTSButtons text={frontText}/>
          </div>
          <div className="text-3xl flex justify-center items-center h-full">
           {frontText}
          </div>
        </section>

      <section className={`absolute w-full h-full backface-hidden bg-white transform rotate-y-180 ${isFlipped ? 'rotate-y-180' : ''} rounded-xl`}  onClick={flipPage}>
          <div className="text-xl absolute bottom-0 right-0 p-4" onClick={e => e.stopPropagation()}>
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
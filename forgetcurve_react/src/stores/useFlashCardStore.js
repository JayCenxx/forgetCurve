import { create } from "zustand";
import { cardJson } from "../assets/cardJson";


const useFlashCardStore=create((set, get) => ({
    curPage: 0,
    isFlipped: false,
    frontText: cardJson[0].frontText,  //set the inital value
    backText: cardJson[0].backText,   
    flipDuration: 1000,
    card: cardJson,       
    
    setCardData: (cardData) => {
      set({
        card: cardData,
        frontText: cardData[0].frontText,
        backText: cardData[0].backText,
      });
    },
  
    flipPage: () => set((state) => { 
      return{ isFlipped: !state.isFlipped }}),
  
      // make it so if curPage state changes, then we set duration-1000 down to 0
    updatePage: (newPage) => {
      const { card } = get();
      if (newPage >= 0 && newPage <= card.length - 1) {
        // when left or right button is click, flip it back to the front back
        set({ flipDuration: 0, isFlipped: false });
        setTimeout(() => {
          set({
            curPage: newPage,
            frontText: card[newPage].frontText,
            backText: card[newPage].backText,
            flipDuration: 1000,
          });
        }, 50);
      }
    },
  
    nextPage: () => {
      const nextPage = get().curPage + 1;
      get().updatePage(nextPage);
    },
  
    prevPage: () => {
      const prevPage = get().curPage - 1;
      get().updatePage(prevPage);
    },
  }));

export default useFlashCardStore;
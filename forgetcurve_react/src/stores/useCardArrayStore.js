import { create } from 'zustand';
import { cardJson } from '../assets/cardJson';
import useLangCodeStore from './useLangCodeStore';
import { findLanguageWithLangCode } from '../utils/LangCodeArray';



const initialCardArray = cardJson.length === 0 ? [{ id: Date.now(),frontText:"",backText:"" }] : [...cardJson,{ id: Date.now(),frontText:"",backText:"" }];

const useCardArrayStore = create((set, get) => ({
  cardArray: initialCardArray,
    // add an extra JSX
  addNewCardJSX: ()=>set(oldState=>({cardArray:[...oldState.cardArray,{id: Date.now(),frontText:"",backText:""} ]})),
//   remove a cardJSX by index, filter's predicate ll exclude the one we want, and include the rest of the elements
  removeCardJSX:  (id)=>set(oldState=>({cardArray:oldState.cardArray.filter(item => item.id !== id)    })),
//move JSX to x position
  moveCardJSX:  (fromIndex, toIndex)=>set(oldState=> {
    const {cardArray} = oldState 
    if (toIndex < 0 || toIndex > cardArray.length || fromIndex === toIndex || typeof toIndex!== "number") {
        console.log("invalid number");
        // make sure the turn the old cardArray, otherwise there ll be bugs
      return cardArray;
    }  
    const newItems = [...cardArray];
    const itemToMove = newItems.splice(fromIndex, 1)[0]; // Remove the item from the current position
    newItems.splice(toIndex, 0, itemToMove); // Insert the item at the target position
    
    return {cardArray:newItems}; 
      }
),
setFrontText:(frontText,index)=>set(state => {
    // Make a shallow copy of the cardArray
    
    const newCardArray = [...state.cardArray];

    // Check if the index is valid
    if (index< newCardArray.length  && index >= 0) {
      // Make a copy of the card at the specified index
      const newCard = { ...newCardArray[index], frontText };

      // Replace the card at the specified index
      newCardArray[index] = newCard; 
    }

    // Return the new state
    return { cardArray: newCardArray };
  }),
  setBackText:(backText,index)=>set(state => {
    
    const newCardArray = [...state.cardArray]; 
    // need to make sure the index is >=0 and  index is < length
    if (index< newCardArray.length  && index >= 0) {
      const newCard = { ...newCardArray[index], backText };
      newCardArray[index] = newCard; 
    }
 
    // Return the new state
    return { cardArray: newCardArray };
  }),
 setCardArray: newArray=>set({cardArray:newArray}),

 swapTextAndLangCodes: (frontLangCode, backLangCode) => {
  set(state => {
    // Here, you swap the card text as before
    const swapFrontnBack = state.cardArray.map(item => ({
      id: item.id,
      frontText: item.backText,
      backText: item.frontText,
    })); 

    // Now update the state of cardArray with the new swapped values
    return { ...state, cardArray: swapFrontnBack };
  });

 
  const { setFrontLangCode, setBackLangCode } = useLangCodeStore.getState();

  // Determine the new backLangCode value based on the frontLangCode input
  const newBackLangCode = frontLangCode.language === "Auto-Detect"
    ? { ...frontLangCode, language: findLanguageWithLangCode(frontLangCode.langCode) }
    : frontLangCode;

  // Update the language codes using the setter function, dont set it in-place
  setFrontLangCode(backLangCode);  
  setBackLangCode(newBackLangCode);

  console.log('Language codes swapped');
},
  
}))

export default useCardArrayStore;
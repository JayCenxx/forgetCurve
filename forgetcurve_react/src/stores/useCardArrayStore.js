import { create } from 'zustand';
import { cardJson } from '../assets/cardJson';



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
    if (toIndex < 0 || toIndex >= cardArray.length || fromIndex === toIndex || typeof toIndex!== "number") {
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
    if (newCardArray.length > index && index >= 0) {
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
    if (newCardArray.length > index && index >= 0) {
      const newCard = { ...newCardArray[index], backText };
      newCardArray[index] = newCard;
    }

    // Return the new state
    return { cardArray: newCardArray };
  }),

  
}))

export default useCardArrayStore;
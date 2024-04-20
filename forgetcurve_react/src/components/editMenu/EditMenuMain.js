import React, { useState } from "react";
import EditMenuTitle from "./EditMenuTitle";
import {EditCardDetails} from "./EditCardDetails"
const EditMenuMain = () => {
  // Initialize with one item with a unique ID
  const [cardArray, setCardArray] = useState([{ id: Date.now() }]); 

  // Function to add a new MenuItem with a unique key
  const addArrayItem = () => {
    setCardArray([...cardArray, { id: Date.now() }]); // Use current timestamp for uniqueness
  
  };

  // Function to remove a MenuItem by ID
  const removeArrayItem = id => {
    setCardArray(cardArray.filter(item => item.id !== id));
   
  };

  const moveArrayItem = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= cardArray.length) {
      console.log('Target index out of bounds');
      return; // Early return if the target index is out of range
    }
    if (fromIndex === toIndex) {
      console.log('Item is already at the target index');
      return; // Early return if the item is already at the desired position
    }
  
    setCardArray( (prevItems) => {
      const newItems = [...prevItems];
      const itemToMove = newItems.splice(fromIndex, 1)[0]; // Remove the item from the current position
      newItems.splice(toIndex, 0, itemToMove); // Insert the item at the target position
      return newItems; // Return the new array to update the state
    });
  };

  function Text(e){
    console.log(e.nativeEvent.data);
  }


  return (
    <>
      <EditMenuTitle />
      
      {cardArray.map((item,index) => (
        // use react.frag instead of <> cause of props 
        <React.Fragment key={item.id}>
       <EditCardDetails removeArray={removeArrayItem} moveArray={moveArrayItem} itemId={item.id} indexs={index}/> 
         
          <button onClick={() => moveArrayItem(index, index + 1)} disabled={index === cardArray.length }>Move Down</button>
          <button onClick={() => moveArrayItem(index, index - 1)} disabled={index === cardArray.length }>Move Up</button>
       
        </React.Fragment>
      ))}
      <button onClick={addArrayItem}> Add Item</button>
    </>
  );
};

export default EditMenuMain;
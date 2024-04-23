import React, { useState } from "react";
import EditMenuTitle from "./EditMenuTitle";
import { EditCardDetails } from "./EditCardDetails"; 
import useCardArrayStore from "../../stores/useCardArrayStore";

const EditMenuMain = () => {
 
const cardArray =useCardArrayStore(i=>i.cardArray)
  // Initialize with one item with a unique ID
 

  const saveCardArray=()=>{

    // cardArrayServ();
  }

  return (
    <>
      {/* create a return and save button   */}

      <section className="flex flex-row pt-10 justify-center">
      {/* <div className="basis-[15%]" /> */}
      <button className="btn bg-white shadow-lg text-lg">Go Back</button>
        <div className="basis-5/12 md:basis-[50%]  xl:basis-[60%]" />

        {/* send this as the array as a get request & also check if front & backText fields if they r empty */}
        <button className="btn bg-white shadow-lg text-lg">Save</button>
      </section>
      <EditMenuTitle />
      {cardArray.map((item, index) => (
        // use react.frag instead of <> cause of props
        <React.Fragment key={item.id}>
          <EditCardDetails
            itemId={item.id}
            index2={index}
          />
        </React.Fragment>
      ))}
    </>
  );
};

export default EditMenuMain;

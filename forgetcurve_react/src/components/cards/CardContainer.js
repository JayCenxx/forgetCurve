import { FiPlus } from "react-icons/fi";
import { buttonStyle } from "../../style/styles";
import CardSetDetails from "./CardDetails";
import { FaRegHandPointer } from "react-icons/fa";
import { MdDeleteOutline,MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { BiDownArrow } from "react-icons/bi";
import ThreedotsButton from "../buttons/ThreedotsButton";
import { useState } from "react";

const CardContainer = () => {
  return (
    <>
      {/* physical button */}
      <section className="flex items-center justify-start space-x-2  w-9/12 mx-auto py-2 border-b-2 border-gray-300">
        <div className="flex space-x-2 whitespace-nowrap">
        <button
          className={`${buttonStyle.pill_container} ${buttonStyle.colorRing} py-2 shadow-md`}
        >
          <FiPlus className="text-lg " />
          <span className={`${buttonStyle.pill_span} md:block hidden`}>New Set</span>
        </button>
        <button
          className={`${buttonStyle.pill_container} ${buttonStyle.colorRing} py-2 shadow-md`}>
          <FaRegHandPointer className="text-lg " />
          <span className={`${buttonStyle.pill_span} md:block hidden`}>Select</span>
        </button>
        <button
          className={`${buttonStyle.pill_container} ${buttonStyle.colorRing} py-2 shadow-md`}>
          <MdOutlineDriveFileRenameOutline className="text-lg " />
          <span className={`${buttonStyle.pill_span} md:block hidden`}>Rename</span>
        </button>
        <button
          className={`${buttonStyle.pill_container} ${buttonStyle.colorRing} py-2 shadow-md`}>
          <MdDeleteOutline className="text-lg " />
          <span className={`${buttonStyle.pill_span} md:block hidden`}>Delete</span>
        </button>
        </div>
        <div className="flex-grow"/>
        <div className="flex">

   

        <ThreedotsButton Icon={BiDownArrow}  Name={"Sort"} >


        </ThreedotsButton>

        </div>
      </section>

{/* tap system */}
      <section className="flex items-center justify-start space-x-1  w-9/12 mx-auto mt-6 pl-3">
        <div className="flex items-center justify-center px-4 py-1  shadow-lg rounded-md  hover:bg-gray-100 focus:outline-none py-3">
           Default
        </div>
        <button
          className={`${buttonStyle.round_container} ${buttonStyle.colorRing} py-2 shadow-md`}
        >
          <FiPlus className="text-lg " />
          <span className={buttonStyle.round_span}></span>
        </button>
      </section>

{/* card deck module */}
      <section className="grid grid-cols-12  w-9/12 mx-auto ">
        <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 m-3">
          <CardSetDetails />
        </div>

        <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 m-3">
          <CardSetDetails />
        </div>
      </section>
    </>
  );
};

export default CardContainer;

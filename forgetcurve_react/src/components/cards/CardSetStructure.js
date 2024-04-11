import { FiPlus } from "react-icons/fi";
import { buttonStyle, cardButtonStyle } from "../../style/styles";
import CardSetDetails from "./CardSetDetails";
import { FaRegHandPointer } from "react-icons/fa";
import { MdDeleteOutline,MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { BiDownArrow } from "react-icons/bi";
import ThreedotsButton from "../buttons/ThreedotsButton";
import  {sampleJson}  from "../../utils/sampleJson";
const CardSetStructure = () => {
  return (
    <>
      {/* physical button */}
      <section className="flex items-center justify-start space-x-2  w-9/12 mx-auto py-2 border-b-2 border-gray-300 m-7">
        <div className="flex space-x-2 whitespace-nowrap">
        <button
          className={`${cardButtonStyle.card_Container} ${cardButtonStyle.colorRing}`}
        >
          <FiPlus className="text-lg " />
          <span className={`${cardButtonStyle.card_span} `}>New Set</span>
        </button>
        <button
          className={`${cardButtonStyle.card_Container} ${cardButtonStyle.colorRing}`}>
          <FaRegHandPointer className="text-lg " />
          <span className={`${cardButtonStyle.card_span}`}>Select</span>
        </button>
        <button
          className={`${cardButtonStyle.card_Container} ${cardButtonStyle.colorRing}`}>
          <MdOutlineDriveFileRenameOutline className="text-lg " />
          <span className={`${cardButtonStyle.card_span}`}>Rename</span>
        </button>
        <button
          className={`${cardButtonStyle.card_Container} ${cardButtonStyle.colorRing}`}>
          <MdDeleteOutline className="text-lg " />
          <span className={`${cardButtonStyle.card_span}`}>Delete</span>
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
        <div className="flex items-center justify-center px-4 py-1  shadow-lg rounded-md  hover:bg-gray-100 focus:outline-none py-3 bg-white">
           Default
        </div>
        <button
          className={`${buttonStyle.round_container} ${buttonStyle.colorRing} py-2 shadow-md bg-white`}
        >
          <FiPlus className="text-lg " />
          <span className={buttonStyle.round_span}></span>
        </button>
      </section>

{/* card deck module */}
      <section className="grid grid-cols-12  w-9/12 mx-auto ">
        {sampleJson.map(item=>(
        <div key={item.key} className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 m-3">
        <CardSetDetails subject={item.subject} reviewTime={item.reviewTime} reviewTerms={item.reviewTerms} stars={item.stars} totalTerms={item.totalTerms} views={item.views} createDate={item.createDate}/>
      </div>
        ))}
      

  
      </section>
    </>
  );
};

export default CardSetStructure;

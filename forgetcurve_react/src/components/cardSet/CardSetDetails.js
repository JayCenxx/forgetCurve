import { buttonStyle } from "../../style/styles";
import { FaStar } from "react-icons/fa";
import ThreedotsButton from "../buttons/ThreedotsButton";


const CardSetDetails = ({subject, reviewTime,reviewTerms,stars,totalTerms,views,createDate}) => {
  return (
    <main className="bg-white shadow-xl rounded-xl ">
      
      {/* title */}
      <section className="flex items-center justify-between w-full">
        <div className="w-1/3"></div>
        <section className="w-full text-center text-md font-semibold text-gray-900">
        {subject}
      </section>
        <div className="w-1/3 text-right">
          <ThreedotsButton/>
        </div>
      </section>

{/* conditional rendering when props are not passed in  */}
    {subject && reviewTime &&createDate &&(
      <>
      <section className="flex items-center justify-center">
        <div className="flex items-center space-x-1">
          <FaStar className="text-yellow-400 " />
          <span className="text-md text-gray-600">{stars}/5 </span>
        </div>
      </section>

   
      <section className="flex items-center justify-center mt-2 ">
        <div className="text-md text-gray-600">{totalTerms} Terms</div>
        <div className="w-4"/>
        <div className=" text-md text-gray-600 "> {views} views</div>
      </section>

 
      <section className="flex items-center justify-center mt-2">
        <div className="text-md text-gray-600 ">Created {createDate}</div>
      </section>
      </>
    )}

      <section className="flex mt-2 items-center justify-center">
        <div className=" text-md text-gray-600 ">{`${reviewTerms} Terms to review in ${reviewTime}`}</div>
      </section>


      {/* browse or review button */}
      <section className="flex items-center justify-center py-4">
        {/*Login Button */}
        <button className={`${buttonStyle.pill_container} `}>
          <div className={`${buttonStyle.pill_span} `}>Browse</div>
        </button>
      </section>

    </main>
  );
};

export default CardSetDetails;

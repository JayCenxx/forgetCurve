import { buttonStyle } from "../style/styles";
import { FaStar } from "react-icons/fa";
import ThreedotsButton from "./buttons/ThreedotsButton";


const CardSetDetails = () => {
  return (
    <main className="bg-white shadow-lg rounded-xl p-4 max-w-xs w-full ">
      <section className="flex flex-row ">
        <div className="basis-5/12"></div>
        <div className="text-md font-semibold text-gray-900">Science</div>
        <div className="basis-4/12"></div>
          <ThreedotsButton />
      </section>
      
      <section className="flex items-center justify-center">
        <div className="flex items-center space-x-1">
          <FaStar className="text-yellow-400 "/>
          <span className="text-md text-gray-600">0.0 Stars</span>
        </div>
      </section>

      <section className="flex flex-row mt-2 ">
       <div className="basis-24 "></div>
          <div className="basis-1/4  text-md text-gray-600">4 terms</div>
          <div className="basis-1/4 text-md text-gray-600 "> 0 views</div>
      </section>

      <section className="flex flex-row mt-2">
      <div className="basis-24 "></div>
      <div className="basis-2/4 text-md text-gray-600 ">Created June 2023</div>
      </section>

      <section className="flex flex-row mt-2">
      <div className="basis-24 "></div>
      <div className="basis-2/4 text-md text-gray-600 ">Review in 1 day</div>
      </section>

      <section className="flex items-center justify-center mt-4">
        {/*Login Button */}
        <button className={`${buttonStyle.pill_container} `}>
          <div className={`${buttonStyle.pill_span} `}>Browse</div>
        </button>
      </section>
   
    </main>
  );
};

export default CardSetDetails;
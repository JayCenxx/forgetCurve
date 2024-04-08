import { buttonStyle } from "../style/styles";
import { FaStar } from "react-icons/fa";
import ThreedotsButton from "./buttons/ThreedotsButton";


const CardSetDetails = () => {

  return (
    <main className="bg-white shadow-lg rounded-xl ">
      {/* title */}
      <section className="grid grid-cols-12">
        <div className="col-start-6 text-md font-semibold text-gray-900">Science</div>
        <div className="col-start-11"></div>
        {/* 3 dot button */}
       <ThreedotsButton></ThreedotsButton>

      </section>

      {/* stars */}
      <section className="flex items-center justify-center">
        <div className="flex items-center space-x-1">
          <FaStar className="text-yellow-400 " />
          <span className="text-md text-gray-600">0.0 Stars</span>
        </div>
      </section>

      {/* 4 terms & # views */}
      <section className="flex flex-row mt-2 ">
        <div className="basis-24 "/>
        <div className="basis-1/4  text-md text-gray-600">4 terms</div>
        <div className="basis-1/4 text-md text-gray-600 "> 0 views</div>
      </section>

      {/* create date */}
      <section className="flex flex-row mt-2">
        <div className="basis-24 "/>
        <div className="basis-2/4 text-md text-gray-600 ">
          Created June 2023
        </div>
      </section>

      {/* review timer */}
      <section className="flex flex-row mt-2">
        <div className="basis-24 "/>
        <div className="basis-2/4 text-md text-gray-600 ">Review in 1 day</div>
      </section>

      {/* browse or review button */}
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

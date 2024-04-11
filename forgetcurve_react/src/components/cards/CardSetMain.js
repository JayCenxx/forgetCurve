import  {sampleJson}  from "../../utils/sampleJson";
import ArrowButtons from "../buttons/ArrowButton";
import { useNavigate } from 'react-router-dom';
import CardSetDetails from "./CardSetDetails";

const CardSetMain = () => {
  
  const navigate  = useNavigate();
  const handleViewMoreClick = () => {
    navigate ('/CardSetStructure');
  };

  return (
    <main className="m-7 ">
      {/* Cart Set & View More Titles */}
      <section className="flex  mb-4  ">
        {/* spacing */}
        <div className="basis-[13%] "/>
        <div className="flex space-x-7">
          <h2 className="text-xl font-bold ml-5">Card Set</h2>
          <button className="text-black-500 hover:underline"  onClick={handleViewMoreClick}>View more</button>
        </div>
      </section>

      {/* the Card List , affect the outside border & setup rules for the grid */}
      <section className="grid grid-cols-12  w-9/12 mx-auto bg-zinc-50 rounded-lg p-7">
        {sampleJson.map((item, index) => (
          <div key={index} className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 m-3">
            <CardSetDetails subject={item.subject} reviewTime={item.reviewTime} reviewTerms={item.reviewTerms}/>
          </div>
        ))}
      </section>

      {/* arrow key to move to next page */}
      <ArrowButtons></ArrowButtons>
    </main>
     
  );
};

export default CardSetMain;

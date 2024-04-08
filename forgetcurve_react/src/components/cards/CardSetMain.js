import  {sampleJson}  from "../../utils/sampleJson";
import ArrowButtons from "../buttons/ArrowButton";
import { useNavigate } from 'react-router-dom';
const CardSetMain = () => {
  const navigate  = useNavigate();

  const handleViewMoreClick = () => {
    navigate ('/CardSetStructure');
  };

  return (
    <main className="m-7 max-w-4xl mx-auto">
      {/* Cart Set & View More Titles */}
      <section className="flex items-center mb-4 space-x-7">
        <h2 className="text-xl font-bold ml-5">Card Set</h2>
        <button className="text-black-500 hover:underline"  onClick={handleViewMoreClick}>View more</button>
      </section>

      {/* the Card List , affect the outside border & setup rules for the grid */}
      <section className="border-2 border-gray-200 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 ">
        {sampleJson.map((card, index) => {
          return (
            // affect the outside of the card
            <div key={index} className=" rounded shadow m-3 ">
              {/* affect inside each card */}
              <div className="flex p-3 justify-between items-center  ">
                <h3 className="text-lg font-semibold cursor-pointer hover:underline ">
                  {card.subject}
                </h3>
                <div>
                  <p>Review in:</p>
                  <p className="text-center"> {card.reviewTime}</p>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* arrow key to move to next page */}
      <ArrowButtons></ArrowButtons>
    </main>
  );
};

export default CardSetMain;

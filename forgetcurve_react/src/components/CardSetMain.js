const CardSet = () => {
    const cardData = [
      { subject: "Math", reviewTime: "1 Day" },
      { subject: "Chemistry", reviewTime: "1 Hour" },
      { subject: "Science", reviewTime: "1 Week" },
      { subject: "Japanese", reviewTime: "1 Month" },
      { subject: "English", reviewTime: "2 Days" },
      { subject: "English", reviewTime: "2 Days" },
    ];
  
    return (
      <main className="m-7 max-w-5xl mx-auto">
        {/* Cart Set & View More Titles */}
        <section className="flex items-center mb-4 space-x-7">
          <h2 className="text-xl font-bold ml-5">Card Set</h2>
          <button className="text-black-500 hover:underline ">View more</button>
        </section>

        {/* the Card List , affect the outside border & setup rules for the grid */}
        <main className="border-2 border-gray-200 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 ">
          {cardData.map((card, index) => {  return( 
            // affect the outside of the card
            <section key={index} className=" rounded shadow m-3 ">
                {/* affect inside each card */}
              <section className="flex p-3 justify-between items-center  ">
                <h3 className="text-lg font-semibold cursor-pointer hover:underline ">{card.subject}</h3>
                <div>
                    <p>Review in:</p>
                    <p className="text-center"> {card.reviewTime}</p>
                </div>
              </section>
            </section> )}
            )}
        </main>
      </main>
    );
  };
  
  export default CardSet;
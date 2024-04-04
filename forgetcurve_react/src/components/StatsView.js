import { useState } from "react";
import * as styles from "charts.css"; // allows the chart to work


//For reference
const ONE_YEAR = 31536000000; //milliseconds
const ONE_MONTH = 2592000000; //milliseconds
const ONE_DAY = 86400000; //millisecond
const ONE_HOUR = 3600000; //milliseconds
const ONE_MINUTE = 60000; //milliseconds


//*********************************************
//Testing data
const randomWords = ["seat", "curtain", "deer", "office", "rest", "bread", "route", "bit", "order", "selection", "birthday", "owl", "question", "glove", "feeling", "zinc", "finger", "mice", "camp", "books"]
const dummyData = {
  userDecks: []
};
//Generate testing card decks
for (let i = 0; i < 50; i++) {
  dummyData.userDecks.push(
    {
      id: i,
      name: randomWords[Math.floor(Math.random() * randomWords.length)], //Assign a random name
      cards: ["some", "array", "of", "cards"],
      nextReview: Date.now() + (ONE_DAY * i), //date
      lastReview: 1234, //date
      numReviews: Math.floor(Math.random() * 50), //Number of times deck has been reviewed
    }
  )
};
//********************************************** */

//Notes:
// This uses the chart.css library + Tailwind CSS to format chart
// Tailwind CSS classes are at the bottom of module. Edit to change appearance.
// Issues to resolve later:
// How to display text for each card category:
// - Since each bar has a limited width/ height, the label text can be cut off.
//   Suggestions: Display text vertically/Display text in bar/Omit text, Color match bars with table on the right
//
// - Graph tends to float to the top of container
//   (Tried using Tailwinds align-baseline etc to correct but wouldn't work. Need to determine the exact boundaries
//    of the chart and experiment with behaviors)
//
const StatsView = (props) => {

  const {
    showLimit = 10, //Max num of graphs/rows to show
    userInfo = dummyData, //userInfo can be passed as props or using global state
  } = props;

  //Reducer to get the highest number in range
  //Reducer will only evaluate up to the showLimit
  const [maxRange, setMaxRange] = useState(Math.max(10, userInfo.userDecks.reduce((max, obj, idx) => {
    if (idx > showLimit) {
      return max;
    }
    return Math.max(max, obj.numReviews);
  }, 0)));

  //Function to specify which decks and what order are displayed:
  const decksToDisplay = (() => {
    //Replace with deck selecting logic...
    return userInfo.userDecks;
  })()

  return (
    <div id={"theContainer"} className={boxStyle.container}>

      {/* This is the chart */}
      <div id={"chartContainer"} className={chartStyle.container}>
        <div className={chartStyle.yLabel}>
          Times Reviewed
        </div>
        <table id={"statsgraph"} className={chartStyle.table} >
          {/* <thead> doesn't really matter for chart, but will display if chart-css is disabled, so I included it */}
          <caption className={chartStyle.caption}>
            Recent Reviews
          </caption>
          <thead>
            <tr>
              <th className="border">
                Deck
              </th>
              <th className="border">
                Times Reviewed
              </th>
              <th className="border">
                Time till next review
              </th>
            </tr>
          </thead>
          <tbody>
            {decksToDisplay.map((deck, idx) => {
              if (idx > showLimit) {
                return null;
              }
              return (
                <tr key={idx}>
                  <th className={chartStyle.xLabel} scope="row">{deck.name}</th>
                  <td style={{ '--size': deck.numReviews / maxRange }}>
                    <span>
                      {deck.numReviews}
                    </span>
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>

      {/* This is the table */}
      <div id={"tableContainer"} className={tableStyle.container}>
        <table className={tableStyle.table}>
          <thead>
            <tr>
              <th className="border">
                Deck
              </th>
              <th className="border">
                Times Reviewed
              </th>
              <th className="border">
                Time till next review
              </th>
            </tr>

          </thead>
          <tbody>
            {decksToDisplay.map((deck, idx) => {
              if (idx > showLimit) return;
              const timeTillNextReview = Math.floor((deck.nextReview - Date.now()) / ONE_DAY);
              return (
                <tr key={idx}>
                  <td className={tableStyle.cell} >
                    {deck.name}
                  </td>
                  <td className={tableStyle.cell + " text-center"}>
                    {deck.numReviews}
                  </td>
                  <td className={tableStyle.cell + " text-center"}>
                    {
                      timeTillNextReview === 0 ?
                        'Today' :
                        timeTillNextReview === 1 ?
                          timeTillNextReview + ' day' :
                          timeTillNextReview + ' days'
                    }


                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>

  )
}

//styles/classNames:
const boxStyle = { //The overall container
  container: "grid gap-x-4 bg-white shadow-lg rounded-lg place-item-start w-full max-w-6xl p-2 grid-col-1  sm:grid-cols-2",
};

const chartStyle = { //The graph
  container: "bg-white border rounded  p-2",
  table: "charts-css column show-heading show-labels show-primary-axis show-4-secondary-axes dav-19 data-spacing-1 ros-85",
  caption: "",
  xLabel: ` text-nowrap truncate rotate-[-25deg]`,
  yLabel: "-rotate-90 absolute top-40 -left-8 ",
};

const tableStyle = { //The table
  container: "bg-white rounded",
  table: "border-collapse w-full",
  cell: "border px-2 py-1"
};

export default StatsView;
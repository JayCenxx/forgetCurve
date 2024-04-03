import { useState } from "react";
import * as styles from "charts.css"; // allows the chart to work

//For reference
const ONE_YEAR = 31536000000; //milliseconds
const ONE_MONTH = 2592000000; //milliseconds
const ONE_DAY = 86400000; //millisecond
const ONE_HOUR = 3600000; //milliseconds
const ONE_MINUTE = 60000; //milliseconds


//Testing data
const dummyData = {
    userDecks: []
};
//create fake decks
for (let i = 0; i < 50; i++) {
    dummyData.userDecks.push(
        {
            id: i,
            name: "Language" + i,
            cards: ["some", "array", "of", "cards"],
            nextReview: 1712176490804 + (ONE_DAY * i), //date
            lastReview: 1234, //date
            numReviews: i,

        }
    )
};

// Use Math.max to get range of reviews

const StatsView = (props) => {

    const {
        showLimit = 8,
    } = props;

    // const [showLimit, setShowLimit] = useState(5);
    const [maxRange, setMaxRange] = useState(10);

    return (
        <div id={"theContainer"} className={boxStyle.container}>

            {/* This is the chart */}
            <div id={"chartContainer"} className={chartStyle.container}>
                <div className={chartStyle.yLabel}>
                    Times Reviewed
                </div>
                <table id={"statsgraph"} className={chartStyle.table} >
                    {/* thead doesn't really matter for chart, but will display if chart-css is disabled */}
                    <caption className={chartStyle.caption}>Title</caption>
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
                        {dummyData.userDecks.map((deck, idx) => {
                            if (idx > showLimit) return null;
                            return (
                                <tr key={idx}>
                                    <th className={chartStyle.xLabel} scope="row">{deck.name}</th>
                                    <td style={{ '--size': deck.numReviews / maxRange }}>
                                        <span className="absolute top-3 truncate w-4">
                                            {deck.name}
                                        </span>
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
                        {dummyData.userDecks.map((deck, idx) => {
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
                                    <td className={tableStyle.cell}>
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

const boxStyle = {
    container: "grid gap-x-4 bg-white shadow-lg rounded-lg place-item-start w-full max-w-6xl p-2 grid-col-1  sm:grid-cols-2",
    caption: ""
};

const chartStyle = {
    container: "bg-white border rounded  p-2",//w-full max-w-96
    table: "charts-css column show-heading show-labels show-primary-axis show-4-secondary-axes dav-19 data-spacing-1 ros-85",
    caption: "",
    xLabel: ` text-nowrap truncate rotate-[-25deg]`,
    yLabel: "-rotate-90 absolute top-40 -left-8 ",
};

const tableStyle = {
    container: "bg-white rounded", //w-full max-w-96
    table: "border-collapse w-full",
    cell: "border px-2 py-1"
};

export default StatsView;
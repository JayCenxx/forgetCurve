import { useState } from "react";

const dummyData = {
    userDecks: []
};
//create fake decks
for (let i = 0; i < 15; i++) {
    dummyData.userDecks.push(
        {
            id: i,
            name: "cardSet" + i,
            cards: ["some", "array", "of", "cards"],
            nextReview: 1234, //date
            lastReview: 1234, //date
            numReviews: i,

        }
    )
};

// Use Math.max to get range of reviews
const StatsView = () => {

    const [showLimit, setShowLimit] = useState(10);

    return (
        <div className={statBox.containerStyle}>

            <div className="bg-white border rounded">
                This is the graph
                <div className="flex flex-row">
                    {dummyData.userDecks.map((deck, idx) => {
                        if (idx > showLimit) return;
                        return (
                            <div style={{
                                width: '50px',
                                border: 'solid black 1px',
                                height: (dummyData.userDecks[idx].numReviews * 20) + 'px',
                                backgroundColor: 'red'
                            }}>
                                {dummyData.userDecks.numReviews}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="bg-white border rounded">
                <table>
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
                    {dummyData.userDecks.map((deck, idx) => {
                        if (idx > showLimit) return;

                        return (
                            <tr key={idx}>
                                <td className={statBox.cellStyle} >
                                    {deck.name}
                                </td>
                                <td className={statBox.cellStyle + " text-center"}>
                                    {deck.numReviews}
                                </td>
                                <td className={statBox.cellStyle}>
                                    { }
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>

    )
}

const statBox = {
    containerStyle: "grid gap-x-4 grid-cols-2 bg-white shadow-lg rounded-lg",
    cellStyle: "border",
}

export default StatsView;
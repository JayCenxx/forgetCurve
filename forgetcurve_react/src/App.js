// App.js

import CardSetMain from "./components/cardSet/CardSetMain";
import CardSetStructure from "./components/cardSet/CardSetStructure";
import EditMenuMain from "./components/editMenu/EditMenuMain";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./style/global.css"
import FlashCard from "./components/cards/FlashCard";
import { EditCardDetails } from "./components/editMenu/EditCardDetails";

function App() {


  return (
    <>
    <Router >

      <Header></Header>
      {/* <Routes>
        <Route path="/" element={<CardSetMain />} />
        <Route path="/CardSetStructure" element={<CardSetStructure />} />
      </Routes> */}
 <FlashCard></FlashCard>
{/* <EditMenuMain></EditMenuMain>  */}
   </Router>
   </>
  );
}

export default App;

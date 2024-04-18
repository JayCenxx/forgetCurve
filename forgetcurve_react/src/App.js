// App.js

import CardSetMain from "./components/cardSet/CardSetMain";
import CardSetStructure from "./components/cardSet/CardSetStructure";
import CardDetailsEdit from "./components/cards/CardDetailsEdit"; 
import EditMenuTitle from "./components/editMenu/EditMenuTitle";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function App() {


  return (
    <Router>

      <Header></Header>
      <Routes>
        {/* <Route path="/" element={<CardSetMain />} /> */}
        <Route path="/CardSetStructure" element={<CardSetStructure />} />
      </Routes>
  
<EditMenuTitle></EditMenuTitle>
   </Router>
  );
}

export default App;

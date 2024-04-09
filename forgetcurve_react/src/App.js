// App.js

import { RxSpeakerLoud } from "react-icons/rx";
import CardSetMain from "./components/cards/CardSetMain";
import CardSetStructure from "./components/cards/CardSetStructure";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TTSButtons from "./components/buttons/TTSButton";

function App() {


  return (
    <Router>
      <Header></Header>
    
      <nav></nav>
      <Routes>
        <Route path="/" element={<CardSetMain />} />
        <Route path="/CardSetStructure" element={<CardSetStructure />} />
      </Routes>

      <TTSButtons/>
    </Router>
  );
}

export default App;

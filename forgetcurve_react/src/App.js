// App.js

import { RxSpeakerLoud } from "react-icons/rx";
import CardSetMain from "./components/cards/CardSetMain";
import CardSetStructure from "./components/cards/CardSetStructure";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TTSButtons from "./components/buttons/TTSButton";
import FlashCard from "./components/cards/FlashCard";

function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<CardSetMain />} />
        <Route path="/CardSetStructure" element={<CardSetStructure />} />
      </Routes>
      <FlashCard />
    </Router>
  );
}

export default App;

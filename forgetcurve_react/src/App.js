// App.js

import CardSetMain from "./components/cards/CardSetMain";
import CardSetStructure from "./components/cards/CardSetStructure";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<CardSetMain />} />
        <Route path="/CardSetStructure" element={<CardSetStructure />} />
      </Routes>
     
    </Router>
  );
}

export default App;

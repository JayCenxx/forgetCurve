// App.js

import CardSetMain from "./components/cardSet/CardSetMain";
import CardSetStructure from "./components/cardSet/CardSetStructure";
import CardDetailsEdit from "./components/cards/CardDetailsEdit"; 
import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toolbar } from "./components/richTextEditor/Toolbar";
import { MyEditor } from "./components/richTextEditor/MyEditor";
import { useState } from "react";

function App() {


  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<CardSetMain />} />
        <Route path="/CardSetStructure" element={<CardSetStructure />} />
      </Routes>
      <CardDetailsEdit/>


    </Router>
  );
}

export default App;

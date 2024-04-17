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

  const [activeEditor, setActiveEditor] = useState(null);

  // Function to handle setting the active editor
  const handleEditorFocus = (editor) => {
    setActiveEditor(editor);
  };
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<CardSetMain />} />
        <Route path="/CardSetStructure" element={<CardSetStructure />} />
      </Routes>
      <CardDetailsEdit/>

 <div className="App">
      {/* Pass down the activeEditor and the setter function to Toolbar */}
      <Toolbar activeEditor={activeEditor} setActiveEditor={setActiveEditor} />

      {/* Two separate editors that notify App when they gain focus */}
      <MyEditor
        editorContent="<p>Editor 1 content</p>"
        onEditorFocus={handleEditorFocus}
      />
      <MyEditor
        editorContent="<p>Editor 2 content</p>"
        onEditorFocus={handleEditorFocus}
      />
    </div>
    </Router>
  );
}

export default App;

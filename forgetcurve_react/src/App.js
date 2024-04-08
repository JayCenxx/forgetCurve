// App.js
import CardContainer from "./components/cards/CardContainer";
import CardSetDetails from "./components/cards/CardDetails";
import CardSetMain from "./components/cards/CardSetMain";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <Header />
      <CardSetMain/>
    <CardContainer/>
    </>
  );
}

export default App;

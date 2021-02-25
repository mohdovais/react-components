import React from "react";
import Calendar from "./components/calendar/Calendar";
//import countries from "../data/countries.json";

function App(): JSX.Element {
  return (
    <div style={{ width: 1024, padding: "2em", margin: "0 auto" }}>
      <Calendar onSelect={(date) => console.log(date)} />
    </div>
  );
}

export default App;

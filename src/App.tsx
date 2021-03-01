import React from "react";
import "focus-visible";
import Calendar from "./components/calendar/Calendar";
import {
  Segment,
  SegmentedControl,
} from "./components/segmented-control/SegmentedControl";
//import countries from "../data/countries.json";

function App(): JSX.Element {
  const [color, setColor] = React.useState("blue");
  return (
    <div style={{ width: 1024, padding: "2em", margin: "0 auto" }}>
      <SegmentedControl value={color} onChange={setColor}>
        <Segment value="red">Red</Segment>
        <Segment value="blue">Blue</Segment>
        <Segment value="green">Green</Segment>
      </SegmentedControl>
      <hr />
      <Calendar onSelect={(date) => console.log(date)} />
    </div>
  );
}

export default App;

import type { Component } from "solid-js";
import DatePickerExample from "./DatePickerExample";
import AnnualGraphExample from "./AnnualGraphExample";
import MonthPickerExample from "./MonthPickerExample";
import WeekdaySelectExample from "./WeekdaySelectExample";

const App: Component = () => {
  return (
    <div id="container">
      <h1>SolidTimeline</h1>
      <p>Components for basic Date interaction in the solidjs ecosystem</p>

      <MonthPickerExample />
      <DatePickerExample />
      <WeekdaySelectExample />
      <AnnualGraphExample />
    </div>
  );
};

export default App;

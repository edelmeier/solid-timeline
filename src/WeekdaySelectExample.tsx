import { createSignal } from "solid-js";
import { WeekdaySelect } from "./components";

export default function WeekdaySelectExample() {
  const [ex1, setEx1] = createSignal<Date>(new Date());

  return (
    <div class="component-frame">
      <h2>WeekdaySelect</h2>
      <WeekdaySelect defaultValue={1} onChangeHandler={(w) => {}} />
    </div>
  );
}

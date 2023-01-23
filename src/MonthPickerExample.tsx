import { createSignal } from "solid-js";
import { MonthPicker } from "./components";

export default function MonthPickerExample() {
  const [ex1, setEx1] = createSignal<Date>(new Date());

  return (
    <div class="component-frame">
      <h2>MonthPicker</h2>
      <MonthPicker
        defaultValue={{ year: 2023, monthIndex: 4 }}
        valueChangedHandler={(v) => {}}
      />
    </div>
  );
}

import { createSignal } from "solid-js";
import { DatePicker } from "./components";

export default function DatePickerExample() {
  const [ex1, setEx1] = createSignal<Date>(new Date());

  return (
    <div class="component-frame">
      <h2>DatePicker</h2>
      <DatePicker
        value={ex1()}
        onSelect={(d) => {
          setEx1(d);
          alert(d.toString());
        }}
      />
    </div>
  );
}

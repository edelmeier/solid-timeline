// Copyright (c) 2023, Sebastian Edelmeier
// All rights reserved.
//
// This source code is licensed under the ISC license found in the
// LICENSE file in the root directory of this source tree.

import { createSignal } from "solid-js";
import UpIcon from "@suid/icons-material/ExpandLess";
import DownIcon from "@suid/icons-material/ExpandMore";
import { months } from "./constants";
import styles from "~/MonthPicker.module.css";

export interface Month {
  monthIndex: number;
  year: number;
}

export interface MonthPickerProps {
  defaultValue: Month;
  valueChangedHandler: (month: Month) => void;
}

export function MonthPicker(props: MonthPickerProps) {
  const currentYear = new Date().getFullYear();
  const monthsItems = new Map<number, string>();
  const [selectedMonth, setSelectedMonth] = createSignal<number>(
    props.defaultValue.monthIndex
  );
  const [selectedYear, setSelectedYear] = createSignal<number>(
    props.defaultValue.year
  );

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 12; i++) {
    monthsItems.set(i, months[i]);
  }

  const years = new Array<number>();
  // eslint-disable-next-line no-plusplus
  for (let i = currentYear - 5; i < currentYear + 5; i++) {
    years.push(i);
  }

  const handleUp = () => {
    if (selectedMonth() === 11) {
      setSelectedYear(selectedYear() + 1);
      setSelectedMonth(0);
    } else {
      setSelectedMonth(selectedMonth() + 1);
    }
    props.valueChangedHandler({
      monthIndex: selectedMonth(),
      year: selectedYear(),
    });
  };

  const handleDown = () => {
    if (selectedMonth() === 0) {
      setSelectedYear(selectedYear() - 1);
      setSelectedMonth(11);
    } else {
      setSelectedMonth(selectedMonth() - 1);
    }
    props.valueChangedHandler({
      monthIndex: selectedMonth(),
      year: selectedYear(),
    });
  };

  return (
    <>
      <div class={styles.MonthFrame}>
        <p>
          {months[selectedMonth()]} {selectedYear()}
        </p>
        <div class={styles.button} role="button" onClick={() => handleUp()}>
          <UpIcon />
        </div>
        <div class={styles.button} role="button" onClick={() => handleDown()}>
          <DownIcon />
        </div>
      </div>
    </>
  );
}

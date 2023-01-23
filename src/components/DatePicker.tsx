// Copyright (c) 2023, Sebastian Edelmeier
// All rights reserved.
//
// This source code is licensed under the ISC license found in the
// LICENSE file in the root directory of this source tree.

import { Popover, TextField } from "@suid/material";
import { createEffect, createSignal, For } from "solid-js";
import { getMonday, parseDate } from "./functions";
import styles from "./DatePicker.module.css";
import { Month, MonthPicker } from "./MonthPicker";
import { DayItem } from "./calendar.types";

function getForegroundColor(day: DayItem): string {
  if (day.selected) return "#fff";
  if (day.active) return "#888";
  return "#ccc";
}

export interface DatePickerProps {
  value: Date;
  onSelect: (date: Date) => void;
}

export function DatePicker(props: DatePickerProps) {
  const [anchorEl, setAnchorEl] = createSignal<HTMLInputElement | null>(null);
  const [value, setValue] = createSignal<Date>(new Date());
  const [monthIndex, setMonthIndex] = createSignal<number>(0);
  const [year, setYear] = createSignal<number>(1);
  const [dayItems, setDayItems] = createSignal<DayItem[]>([]);

  createEffect(() => {
    setValue(() => props.value);
    setMonthIndex(() => value().getMonth());
    setYear(value().getFullYear());
  });

  createEffect(() => {
    const firstOfMonth = new Date(year(), monthIndex(), 1);
    const lastOfMonth = new Date(year(), monthIndex() + 1, 0);
    const daysInMonth = lastOfMonth.getDate();
    const actualStartDate = getMonday(firstOfMonth);
    const diff = Math.abs(actualStartDate.getTime() - firstOfMonth.getTime());
    const extraDaysBeforeFirst = Math.ceil(diff / (1000 * 3600 * 24));
    const extraDaysAfterLast = 7 - lastOfMonth.getDay();
    const tmpItems: DayItem[] = [];
    const daysWithBuffer =
      daysInMonth + extraDaysBeforeFirst + extraDaysAfterLast;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < daysWithBuffer; i++) {
      const tmpDate = new Date(actualStartDate);
      tmpDate.setDate(actualStartDate.getDate() + i);
      tmpItems.push({
        day: 1,
        date: tmpDate,
        active: !(tmpDate < firstOfMonth || tmpDate > lastOfMonth),
        selected:
          value().getFullYear() === tmpDate.getFullYear() &&
          value().getMonth() === tmpDate.getMonth() &&
          value().getDate() === tmpDate.getDate(),
      });
    }
    setDayItems(() => tmpItems);
  });

  /** ******** Popover handlers ******** */
  const handleClose = () => {
    setAnchorEl(null);
  };

  const setMonth = (month: Month) => {
    setMonthIndex(() => month.monthIndex);
    setYear(() => month.year);
  };

  const selectDate = (date: Date) => {
    setValue(date);
    handleClose();
  };

  const open = () => Boolean(anchorEl());
  const id = () => (open() ? "simple-popover" : undefined);

  /** ******** /Popover handlers ******** */

  return (
    <>
      <TextField
        value={parseDate(value()).toString()}
        onChange={() => {}}
        onClick={(e) => setAnchorEl(e.target as HTMLInputElement)}
      />
      <Popover
        id={id()}
        open={open()}
        anchorEl={anchorEl()}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div class={styles.layout}>
          <div class={styles.Month}>
            <MonthPicker
              defaultValue={{
                monthIndex: monthIndex(),
                year: year(),
              }}
              valueChangedHandler={setMonth}
            />
          </div>
          <div class={styles.calendar}>
            <div class={styles.weekday}>MO</div>
            <div class={styles.weekday}>DI</div>
            <div class={styles.weekday}>MI</div>
            <div class={styles.weekday}>DO</div>
            <div class={styles.weekday}>FR</div>
            <div class={styles.weekday}>SA</div>
            <div class={styles.weekday}>SO</div>
            <For each={dayItems()}>
              {(day) => (
                <div
                  class={styles.date}
                  onClick={() => selectDate(day.date)}
                  style={{
                    color: getForegroundColor(day),
                    background: day.selected ? "#1976d2" : "#fff",
                  }}
                >
                  {day.date.getDate()}
                </div>
              )}
            </For>
          </div>
        </div>
      </Popover>
    </>
  );
}

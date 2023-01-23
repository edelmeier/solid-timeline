// Copyright (c) 2023, Sebastian Edelmeier
// All rights reserved.
//
// This source code is licensed under the ISC license found in the
// LICENSE file in the root directory of this source tree.

import { createEffect, createSignal, For, Show } from "solid-js";
import { DayItem, WeekItem } from "./calendar.types";
import { getMonday } from "./functions";

interface WeeklyGraphProps {
  startDate: Date;
  endDate: Date;
  displayNumbers?: boolean;
}

function WeeklyGraph(props: WeeklyGraphProps) {
  const [days, setDays] = createSignal<DayItem[]>([]);

  createEffect(() => {
    const actualStartDate = getMonday(props.startDate);
    const daysTmp: DayItem[] = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 7; i++) {
      const tmpDate = new Date(actualStartDate);
      tmpDate.setDate(actualStartDate.getDate() + i);
      daysTmp.push({
        day: i,
        date: tmpDate,
        active: !(tmpDate < props.startDate || tmpDate > props.endDate),
      });
    }
    setDays(() => daysTmp);
  });

  return (
    <div
      style={{
        display: "grid",
        gap: "3px",
        "grid-template-rows": "repeat(7, 1em)",
      }}
    >
      <For each={days()}>
        {(day) => (
          <div
            style={{
              "font-size": "0.6em",
              color: day.active ? "#888" : "#ccc",
              background: day.active ? "#ddd" : "transparent",
              "text-align": "center",
            }}
          >
            &nbsp;
            <Show when={props.displayNumbers} keyed={false}>
              {day.date.getDate()}
            </Show>
          </div>
        )}
      </For>
    </div>
  );
}

export interface AnnualGraphProps {
  year: number;
  displayNumbers?: boolean;
}

export function AnnualGraph(props: AnnualGraphProps) {
  const [weeks, setWeeks] = createSignal<WeekItem[]>([]);
  const [monthWidth, setMonthWidth] = createSignal<number>(0);

  createEffect(() => {
    const firstOfYear = new Date(props.year, 0, 1);
    const lastOfYear = new Date(props.year, 11, 31);
    const weekStart = getMonday(firstOfYear);
    const weeksTmp: WeekItem[] = [];

    while (weekStart < lastOfYear) {
      const weekEnd = new Date(
        new Date(weekStart).setDate(weekStart.getDate() + 6)
      );
      const weekStartTmp = new Date(weekStart);
      weeksTmp.push({
        startDate: weekStartTmp < firstOfYear ? firstOfYear : weekStartTmp,
        endDate: weekEnd > lastOfYear ? lastOfYear : weekEnd,
      });
      weekStart.setDate(weekStartTmp.getDate() + 7);
    }
    setWeeks(() => weeksTmp);
    setMonthWidth(() => Math.ceil(weeks().length / 12) * 16);
  });

  return (
    <>
      <div
        style={{
          display: "grid",
          "margin-bottom": "1em",
          color: "#666",
          "font-size": "0.75em",
          gap: "3px",
          "grid-template-columns": `repeat(12, ${monthWidth().toString()}px)`,
        }}
      >
        <div style={{ "text-align": "center" }}>JAN</div>
        <div style={{ "text-align": "center" }}>FEB</div>
        <div style={{ "text-align": "center" }}>MRZ</div>
        <div style={{ "text-align": "center" }}>APR</div>
        <div style={{ "text-align": "center" }}>MAI</div>
        <div style={{ "text-align": "center" }}>JUN</div>
        <div style={{ "text-align": "center" }}>JUL</div>
        <div style={{ "text-align": "center" }}>AUG</div>
        <div style={{ "text-align": "center" }}>SEP</div>
        <div style={{ "text-align": "center" }}>OKT</div>
        <div style={{ "text-align": "center" }}>NOV</div>
        <div style={{ "text-align": "center" }}>DEZ</div>
      </div>
      <div
        style={{
          display: "grid",
          gap: "3px",
          "grid-template-columns": "repeat(53, 16px)",
        }}
      >
        <For each={weeks()}>
          {(week) => (
            <WeeklyGraph
              startDate={week.startDate}
              endDate={week.endDate}
              displayNumbers={props.displayNumbers}
            />
          )}
        </For>
      </div>
    </>
  );
}

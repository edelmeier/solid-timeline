// Copyright (c) 2023, Sebastian Edelmeier
// All rights reserved.
//
// This source code is licensed under the ISC license found in the
// LICENSE file in the root directory of this source tree.

import { mapArray } from "solid-js";
import { weekdays } from "./constants";

export interface WeekdaySelectProps {
  defaultValue: number;
  onChangeHandler: (weekday: number) => void;
}

export function WeekdaySelect(props: WeekdaySelectProps) {
  return (
    <select
      onChange={(e) =>
        props.onChangeHandler(+(e.target as HTMLInputElement).value)
      }
    >
      {mapArray(
        () => weekdays,
        (weekday, index) => (
          <option selected={props.defaultValue === index()} value={index()}>
            {weekday}
          </option>
        )
      )}
    </select>
  );
}

// Copyright (c) 2023, Sebastian Edelmeier
// All rights reserved.
//
// This source code is licensed under the ISC license found in the
// LICENSE file in the root directory of this source tree.

export interface DayItem {
  day: number;
  date: Date;
  active: boolean;
  selected?: boolean;
}

export interface WeekItem {
  startDate: Date;
  endDate: Date;
}

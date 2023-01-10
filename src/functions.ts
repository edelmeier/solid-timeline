import { Month } from "./MonthPicker";

export const parseDate = (input: Date): string => {
  return new Date(input).toLocaleDateString("de-DE");
};

export function getMonday(date: Date): Date {
  const monday = new Date(date);
  const weekdayOfInput = date.getDay() === 0 ? 7 : date.getDay();
  monday.setDate(date.getDate() - weekdayOfInput + 1);
  return monday;
}

export const toDate = (input: string): Date => {
  const dateParser = /(\d{2})\.(\d{2})\.(\d{4})/;
  const match = input.match(dateParser);
  if (!match) {
    throw Error("invalid Date");
  }
  const date = Date.UTC(+match[3], +match[2] - 1, +match[1]);
  return new Date(date);
};

export const YYYYMMToMonth = (input: string): Month => {
  const year = input.substring(0, 4);
  const month = input.substring(4, 6);
  return { monthIndex: +month - 1, year: +year };
};

export const MonthToYYYYMM = (input: Month): string => {
  return `${input.year}${(input.monthIndex + 1).toString().padStart(2, "0")}`;
};

// export const monthForReporting = (month: number): string => {
//   const yearPart = month.toString().substring(0, 4);
//   const monthPart = month.toString().substring(4, 6);
//   return `${months[+monthPart - 1]} ${yearPart}`;
// };

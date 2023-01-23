export const parseDate = (input: Date): string => {
  return new Date(input).toLocaleDateString("de-DE");
};

export function getMonday(date: Date): Date {
  const monday = new Date(date);
  const weekdayOfInput = date.getDay() === 0 ? 7 : date.getDay();
  monday.setDate(date.getDate() - weekdayOfInput + 1);
  return monday;
}

const split = (str: string) => str.split(",");
export const months_short = split(
  "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec"
);
export const months_long = split(
  "January,February,March,April,May,June,July,August,September,October,November,December"
);
export const weekdays_long = split(
  "Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday"
);
export const weekdays_short = split("Mon,Tue,Wed,Thu,Fri,Sat,Sun");

export const getDaysInMonth = (month: number, year: number): number =>
  new Date(year, month, 0).getDate();

const twoDigits = (num: number): string => (num > 9 ? "" : "0") + num;

export const toISOString = (year: number, month: number, day: number): string =>
  year + "-" + twoDigits(month) + "-" + twoDigits(day);

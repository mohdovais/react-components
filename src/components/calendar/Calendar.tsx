import React, { useState } from "react";
import Month from "./Month";
import { months_long } from "./utils";
import style from "./Calendar.module.css";

interface CalendarProps {
  date?: string;
  onSelect?: (date: string) => void;
}

export default function Calendar(props: CalendarProps): JSX.Element {
  const { onSelect } = props;
  const [currentMonthYear, setCurrentMonthYear] = useState(() => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return { month, year };
  });
  const { month, year } = currentMonthYear;

  const next = () =>
    setCurrentMonthYear(({ month, year }) => {
      return month < 12
        ? { month: month + 1, year }
        : { month: 1, year: year + 1 };
    });

  const prev = () =>
    setCurrentMonthYear(({ month, year }) => {
      return month > 1
        ? { month: month - 1, year }
        : { month: 12, year: year - 1 };
    });

  return (
    <div className={style.calendar}>
      <div className={style.header}>
        <button type="button" onClick={() => prev()}>
          Previous
        </button>
        <div className={style.title}>
          {months_long[month - 1]} {year}
        </div>
        <button type="button" onClick={next}>
          Next
        </button>
      </div>
      <Month year={year} month={month} onSelect={onSelect} />
    </div>
  );
}

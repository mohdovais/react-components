import React from "react";
import { getDaysInMonth, weekdays_short, toISOString } from "./utils";
import style from "./Month.module.css";
import { memo, useCallback } from "../react";

interface MonthProps {
  month: number;
  year: number;
  min?: string;
  max?: string;
  onSelect?: (date: string) => void;
}

const Header = memo(function Header() {
  return (
    <header className={style.tr}>
      {weekdays_short.map((weekday) => (
        <div key={weekday} className={style.th}>
          {weekday}
        </div>
      ))}
    </header>
  );
});

const emptyFn = () => {};

export default function Month(props: MonthProps): JSX.Element {
  const { month, year, onSelect = emptyFn } = props;
  const max = getDaysInMonth(month, year);
  const firstDay = new Date(year, month - 1, 1).getDay();
  const weeks = Math.ceil((max + firstDay - 1) / 7);
  const rows = [];
  console.log(firstDay, weeks);

  const callback = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onSelect(event.target.getAttribute("data-date"));
    },
    [onSelect]
  );

  for (let i = 0; i < weeks; i++) {
    rows.push(
      <div key={"week" + i} className={style.tr}>
        {[1, 2, 3, 4, 5, 6, 7].map((d) => {
          const day = i * 7 + d - firstDay + 1;
          const valid = day > 0 && day <= max;
          const date = valid ? toISOString(year, month, day) : "";
          return (
            <div
              key={"day" + d}
              className={style.td + " " + (d > 5 ? style.weekend : "")}
              data-date={date}
              onClick={valid ? callback : undefined}
            >
              {valid ? day : null}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={style.month}>
      <Header />
      {rows}
    </div>
  );
}

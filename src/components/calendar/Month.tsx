import React from "react";
import { emptyFn, getDaysInMonth, weekdays_short, toISOString } from "./utils";
import style from "./Month.module.css";
import { memo, useCallback } from "../react";

interface MonthProps {
  month: number;
  year: number;
  min?: string;
  max?: string;
  today?: string;
  selected?: string;
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

export default function Month(props: MonthProps): JSX.Element {
  const { month, year, max, min, selected, today, onSelect = emptyFn } = props;
  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = new Date(year, month - 1, 1).getDay();
  const weeks = Math.ceil((daysInMonth + firstDay - 1) / 7);
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
          const valid = day > 0 && day <= daysInMonth;
          const date = valid ? toISOString(year, month, day) : "";
          const className = [
            style.td,
            d > 5 ? style.weekend : "",
            today === date ? style.today : "",
          ].join(" ");
          return (
            <div
              key={"day" + d}
              className={className}
              data-date={date}
              onClick={valid ? callback : undefined}
            >
              <span>{valid ? day : null}</span>
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

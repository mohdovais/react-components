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
    <div className={style.tr}>
      {weekdays_short.map((weekday) => (
        <div key={weekday} className={style.th}>
          {weekday}
        </div>
      ))}
    </div>
  );
});

const date2str = (d: Date) => d.toISOString().split("T")[0];

function resolveDate(
  y: number,
  m: number,
  d: number,
  daysInMonth: number,
  daysInPreviousMonth: number
) {
  let yy = y;
  let mm = m;
  let dd = d;
  if (dd < 1) {
    if (mm > 1) {
      mm = mm - 1;
      dd = daysInPreviousMonth + dd;
    } else {
      yy = yy - 1;
      mm = 12;
      dd = daysInPreviousMonth + dd;
    }
  } else if (dd > daysInMonth) {
    if (mm < 12) {
      mm = mm + 1;
      dd = dd - daysInMonth;
    } else {
      yy = yy + 1;
      mm = 1;
      dd = dd - daysInMonth;
    }
  }
  return { yy, mm, dd };
}


export default function Month(props: MonthProps): JSX.Element {
  const { month, year, max, min, selected, onSelect = emptyFn } = props;
  const firstDay = new Date(year, month - 1, 1).getDay();
  const today = date2str(new Date());

  const callback = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onSelect(event.target.getAttribute("data-date"));
    },
    [onSelect]
  );

  /**
   * Week start with Sunday 0 in JavaScript,
   * however, our week start with Monday
   * 7
   */
  const weekDays =
    firstDay === 0 ? [-5, -4, -3, -2, -1, 0, 1] : [2, 3, 4, 5, 6, 7, 8];
  const daysInCurrentMonth = getDaysInMonth(year, month);
  const daysInPreviousMonth = getDaysInMonth(year, month - 1);

  return (
    <div className={style.month}>
      <Header />
      {[0, 1, 2, 3, 4, 5].map((week) => {
        return (
          <div key={"week" + week} className={style.tr}>
            {weekDays.map((weekDay, index) => {
              const { yy, mm, dd } = resolveDate(
                year,
                month,
                week * 7 + weekDay - firstDay,
                daysInCurrentMonth,
                daysInPreviousMonth
              );
              const isCurrentMonth = month === mm;
              const date = toISOString(yy, mm, dd);
              const className = [
                style.td,
                isCurrentMonth ? "" : style.not_current,
                index > 4 ? style.weekend : "",
                today === date ? style.today : "",
              ].join(" ");
              return (
                <div
                  key={"day" + weekDay}
                  className={className}
                  data-date={date}
                  onClick={isCurrentMonth ? callback : undefined}
                >
                  <span>{dd}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

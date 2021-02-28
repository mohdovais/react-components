import * as React from "react";

interface WeekProps {
  year: number;
  month: number;
  week: number;
}

export function Week(props: WeekProps) {
  const { year, month, week } = props;
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
}

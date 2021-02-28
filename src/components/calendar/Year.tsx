import React from "react";
import { emptyFn, months_short } from "./utils";
import style from "./Year.module.css";

type Selection = { month: number; year: number };

interface YearProps {
  year: number;
  selected?: string; // 2020-01 = Jan 2020
  min?: string; // 2020-01 = Jan 2020
  max?: string; // 2020-01 = Jan 2020
  onSelect?: (selection: Selection) => void;
}

type Div = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function Year(props: YearProps): JSX.Element {
  const { year, selected, max = "", min = "", onSelect = emptyFn } = props;

  const rows = [];
  for (let i = 0; i < 3; i++) {
    const row: Div[] = [];
    for (let j = 0; j < 4; j++) {
      row.push(
        <div
          key={"month" + j}
          className={style.td}
          onClick={() => onSelect({ month: i + j + 1, year })}
        >
          {months_short[i + j]}
        </div>
      );
    }
    rows.push(
      <div key={"row" + i} className={style.tr}>
        {row}
      </div>
    );
  }
  return <div>{rows}</div>;
}

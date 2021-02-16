import * as React from "react";
import { ComboboxContext } from "./Combobox";
import css from "./Option.module.css";

export type Value =
  | string
  | number
  | boolean
  | Date
  | object
  | undefined
  | null;

export interface OptionProps {
  disabled?: boolean;
  children: React.ReactNode;
  value?: Value;
}

function Option(props: OptionProps) {
  const { children, disabled, value } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const { onSelect, value: selection } = React.useContext(ComboboxContext);
  const selected = selection === value;

  React.useEffect(() => {
    var timeout: number;
    if (selected) {
      timeout = setTimeout(() => ref.current?.scrollIntoView(), 10);
    }
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      role="option"
      aria-selected={selected}
      aria-disabled={disabled}
      className={[
        css.option,
        selected ? css.selected + " selected" : "",
        disabled ? css.disabled + " disabled" : "",
      ].join(" ")}
      onClick={disabled ? undefined : () => onSelect(value)}
      ref={ref}
    >
      {children}
    </div>
  );
}

export default React.memo(Option);

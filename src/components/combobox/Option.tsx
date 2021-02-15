import * as React from "react";
import style from "./Combobox.module.css";

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

interface PrivateOptionProps extends OptionProps {
  selected: boolean;
  onSelect: (value: Value) => void;
}

function Option(props: OptionProps) {
  return null;
}

export function PrivateOption(props: PrivateOptionProps) {
  const { children, disabled, selected, value, onSelect } = props;
  const ref = React.useRef<HTMLDivElement>(null);

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
        style.option,
        selected ? style.selected + " selected" : "",
        disabled ? style.disabled + " disabled" : "",
      ].join(" ")}
      onClick={disabled ? undefined : () => onSelect(value)}
      ref={ref}
    >
      {children}
    </div>
  );
}

export default React.memo(Option);

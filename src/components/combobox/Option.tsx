import * as React from "react";
import { ComboboxContext, ValueType } from "./common";
import css from "./Option.module.css";

export interface OptionProps {
  disabled?: boolean;
  children: React.ReactNode;
  value?: ValueType;
}

function Option(props: OptionProps) {
  const { children, disabled, value, $__ID } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const { onSelect, value: selection, activeId } = React.useContext(
    ComboboxContext
  );
  const selected = selection === value;
  const active = activeId === $__ID;

  React.useEffect(() => {
    var timeout: number;
    if (selected || active) {
      timeout = setTimeout(() => ref.current?.scrollIntoView(), 10);
    }
    return () => clearTimeout(timeout);
  }, [selected, active]);

  return (
    <div
      role="option"
      aria-selected={selected}
      aria-disabled={disabled}
      id={$__ID}
      className={[
        css.option,
        selected ? css.selected + " selected" : "",
        disabled ? css.disabled + " disabled" : "",
        active ? css.active : "",
      ].join(" ")}
      onClick={disabled ? undefined : () => onSelect(value)}
      ref={ref}
    >
      {children}
    </div>
  );
}

export default React.memo(Option);

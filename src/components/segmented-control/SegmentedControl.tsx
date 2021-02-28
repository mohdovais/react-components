import * as React from "react";
import css from "./SegmentedControl.module.css";

interface SegmentProps<T> {
  value: T;
  children: React.ReactNode;
}

interface SegmentedControlProps<T> {
  value: T;
  onChange: (value: T) => void;
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

type ContextType<T> = {
  value: T;
  onChange: (value: T) => void;
};

const SegmentContext = React.createContext<ContextType<any>>({
  value: undefined,
  onChange: (value: any) => {},
});

export function Segment<T>(props: SegmentProps<T>): JSX.Element {
  const { value, children } = props;
  const { value: selectedValue, onChange } = React.useContext<ContextType<T>>(
    SegmentContext
  );
  const selected = value === selectedValue;
  return (
    <div
      role="radio"
      aria-checked={selected}
      onClick={() => onChange(value)}
      className={css.segment + " " + (selected ? css.selected : "")}
    >
      {children}
    </div>
  );
}

function isSegment(node: React.ReactNode): node is JSX.Element {
  return React.isValidElement(node) && node.type === Segment;
}

export function SegmentedControl<T>(
  props: SegmentedControlProps<T>
): JSX.Element {
  const { onChange, value, children, id, className = "", style } = props;
  const values: T[] = React.Children.toArray(children)
    .filter(isSegment)
    .map((child) => child.props.value);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const length = values.length;
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        onChange(values[(values.indexOf(value) + 1) % length]);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        onChange(values[(length + values.indexOf(value) - 1) % length]);
        break;
    }
  };

  return (
    <div
      role="radiogroup"
      className={css.control + " " + className}
      id={id}
      style={style}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <SegmentContext.Provider value={{ value, onChange }}>
        {children}
      </SegmentContext.Provider>
    </div>
  );
}

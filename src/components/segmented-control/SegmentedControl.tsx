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
  focussed: T | null;
  onChange: (value: T) => void;
};

const SegmentContext = React.createContext<ContextType<any>>({
  value: undefined,
  focussed: null,
  onChange: (value: any) => {},
});

export function Segment<T>(props: SegmentProps<T>): JSX.Element {
  const { value, children } = props;
  const { value: selectedValue, focussed, onChange } = React.useContext<
    ContextType<T>
  >(SegmentContext);
  const selected = value === selectedValue;
  return (
    <div
      role="radio"
      aria-checked={selected}
      onClick={() => onChange(value)}
      className={
        css.segment +
        " " +
        (selected ? css.selected : "") +
        " " +
        (focussed === value ? css.focussed : "")
      }
    >
      {children}
    </div>
  );
}

function isSegment(node: React.ReactNode): node is JSX.Element {
  return React.isValidElement(node) && node.type === Segment;
}

const preventDefault = (event: React.KeyboardEvent) => event.preventDefault();

export function SegmentedControl<T>(
  props: SegmentedControlProps<T>
): JSX.Element {
  const [focussed, setFocussed] = React.useState<T | null>(null);
  const { onChange, value, children, id, className = "", style } = props;
  const values: T[] = React.Children.toArray(children)
    .filter(isSegment)
    .map((child) => child.props.value);

  const onFocus = () => {
    const isSeleced = values.indexOf(value) > -1;
    setFocussed(isSeleced ? value : values[0]);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const length = values.length;
    if (length === 0) {
      return;
    }
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        preventDefault(event);
        setFocussed(
          values[focussed == null ? 0 : (values.indexOf(focussed) + 1) % length]
        );
        break;
      case "ArrowUp":
      case "ArrowLeft":
        preventDefault(event);
        setFocussed(
          values[
            focussed == null
              ? 0
              : (length + values.indexOf(focussed) - 1) % length
          ]
        );
        break;
      case " ":
        preventDefault(event);
        focussed != null && focussed !== value && onChange(focussed);
    }
  };

  const onBlur = () => {
    setFocussed(null);
  };

  return (
    <div
      role="radiogroup"
      className={css.control + " " + className}
      id={id}
      style={style}
      onKeyDown={onKeyDown}
      tabIndex={0}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <SegmentContext.Provider value={{ value, focussed, onChange }}>
        {children}
      </SegmentContext.Provider>
    </div>
  );
}

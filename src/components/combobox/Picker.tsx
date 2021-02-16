import * as React from "react";
import css from "./Picker.module.css";
import { ComboboxContext } from "./common";

interface PickerProps {
  id?: string;
  style?: React.CSSProperties;
  expand?: boolean;
  value: any;
  onSelect: (value: any) => void;
  children: React.ReactNode;
  searchable?: boolean;
  activeId?: string;
}

function Picker(props: PickerProps) {
  const {
    children,
    id,
    style,
    expand = true,
    value,
    onSelect,
    searchable = false,
    activeId,
  } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (expand && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [expand]);

  return (
    <div role="listbox" id={id} className={css.listbox} style={style}>
      {expand ? (
        <ComboboxContext.Provider value={{ value, onSelect, activeId }}>
          {searchable ? (
            <div className={css.search}>
              <input
                type="search"
                spellCheck="false"
                autoComplete="false"
                autoCapitalize="false"
                ref={inputRef}
              />
            </div>
          ) : null}

          <div className={css.scroller}>{children}</div>
        </ComboboxContext.Provider>
      ) : null}
    </div>
  );
}

export default React.memo(Picker);

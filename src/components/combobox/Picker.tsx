import * as React from "react";
import { memo, useRef, useEffect } from "./react";
import {
  listbox as $listbox,
  search as $search,
  scroller as $scroller,
} from "./Combobox.module.css";
import { ComboboxContext, emptyFn, scrollIntoView } from "./context";
import { PickerProps } from "./types";

function Picker<T>(props: PickerProps<T>) {
  const {
    children,
    id,
    style,
    expand = true,
    values,
    onSelect,
    activeId,
    onSearch,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (expand && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [expand]);

  useEffect(() => {
    if (activeId != null && activeId !== "" && activeId !== id) {
      scrollIntoView(document.getElementById(activeId));
    }
  });

  return (
    <div role="listbox" id={id} className={$listbox} style={style}>
      {expand ? (
        <ComboboxContext.Provider value={{ values, onSelect, activeId }}>
          {onSearch !== emptyFn ? (
            <div className={$search}>
              <input
                type="search"
                spellCheck="false"
                autoComplete="false"
                autoCapitalize="false"
                ref={inputRef}
                onChange={
                  typeof onSearch === "function"
                    ? (event) => onSearch(event.target.value)
                    : undefined
                }
              />
            </div>
          ) : null}

          <div className={$scroller}>{children}</div>
        </ComboboxContext.Provider>
      ) : null}
    </div>
  );
}

export default memo(Picker) as typeof Picker;

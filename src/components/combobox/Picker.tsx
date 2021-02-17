import * as React from "react";
import { memo, useRef, useEffect } from "./react";
import {
  listbox as $listbox,
  search as $search,
  scroller as $scroller,
} from "./Combobox.module.css";
import { ComboboxContext } from "./context";
import { PickerProps } from "./types";

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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (expand && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [expand]);

  return (
    <div role="listbox" id={id} className={$listbox} style={style}>
      {expand ? (
        <ComboboxContext.Provider value={{ value, onSelect, activeId }}>
          {searchable ? (
            <div className={$search}>
              <input
                type="search"
                spellCheck="false"
                autoComplete="false"
                autoCapitalize="false"
                ref={inputRef}
              />
            </div>
          ) : null}

          <div className={$scroller}>{children}</div>
        </ComboboxContext.Provider>
      ) : null}
    </div>
  );
}

export default memo(Picker);

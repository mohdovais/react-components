import * as React from "react";
import { memo } from "./react";
import { useRandomId } from "./useRandomId";
import { OptgroupProps } from "./types";

function Optgroup<T>(props: OptgroupProps<T>) {
  const { children, label, disabled } = props;
  const labelId = useRandomId("label");
  return (
    <div role="group" aria-labelledby={labelId} aria-disabled={disabled}>
      <div role="presentaion" id={labelId}>
        {label}
      </div>
      {children}
    </div>
  );
}

export default memo(Optgroup);

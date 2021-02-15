import * as React from "react";
import { OptionProps } from "./Option";
import { useRandomId } from "./useRandomId";

export interface OptgroupProps {
  disabled?: boolean;
  label: string;
  children: React.ReactElement<OptionProps> | React.ReactElement<OptionProps>[];
}

function Optgroup(props: OptgroupProps) {
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

export default React.memo(Optgroup);

export type ValueType =
  | string
  | number
  | boolean
  | Date
  | object
  | undefined
  | null;

export interface OptgroupProps {
  disabled?: boolean;
  label: string;
  children: React.ReactElement<OptionProps> | React.ReactElement<OptionProps>[];
}

export interface OptionProps {
  disabled?: boolean;
  children: React.ReactNode;
  value?: ValueType;
}

export interface PickerProps {
  id?: string;
  style?: React.CSSProperties;
  expand?: boolean;
  value: any;
  onSelect: (value: any) => void;
  children: React.ReactNode;
  searchable?: boolean;
  activeId?: string;
}

export interface ComboboxProps<T> {
  children?:
    | React.ReactElement<OptionProps>
    | React.ReactElement<OptionProps>[]
    | React.ReactElement<OptgroupProps>
    | React.ReactElement<OptgroupProps>[];
  disabled?: boolean;
  multiple?: boolean;
  value?: T;
  onChange: (value: T) => void;
  display?: (value?: T) => React.ReactNode;
}

export type ContextType = {
  value: ValueType;
  activeId?: string;
  onSelect: (value: ValueType) => void;
};

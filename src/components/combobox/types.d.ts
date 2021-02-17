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
  children: React.ReactNode;
  activeId?: string;
  onSelect: (value: any) => void;
  onSearch?: (searchText: string) => void;
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
  onSearch?: (searchText: string) => void;
}

export type ContextType = {
  value: ValueType;
  activeId?: string;
  onSelect: (value: ValueType) => void;
};

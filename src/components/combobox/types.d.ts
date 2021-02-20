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

interface ComboboxSingleProps<T> {
  children?:
    | React.ReactElement<OptionProps>
    | React.ReactElement<OptionProps>[]
    | React.ReactElement<OptgroupProps>
    | React.ReactElement<OptgroupProps>[];
  disabled?: boolean;
  multiple?: false;
  value?: T;
  onChange: (value: T) => void;
  display?: (value?: T) => React.ReactNode;
  onSearch?: (searchText: string) => void;
}

interface ComboboxMultipleProps<T> {
  children?:
    | React.ReactElement<OptionProps>
    | React.ReactElement<OptionProps>[]
    | React.ReactElement<OptgroupProps>
    | React.ReactElement<OptgroupProps>[];
  disabled?: boolean;
  multiple: true;
  value?: T[];
  onChange: (value: T[]) => void;
  display?: (value?: T[]) => React.ReactNode;
  onSearch?: (searchText: string) => void;
}

export type ComboboxProps<T extends ValueType> = ComboboxSingleProps<T> | ComboboxMultipleProps<T>;

export type ContextType = {
  value: ValueType;
  activeId?: string;
  onSelect: (value: ValueType) => void;
};

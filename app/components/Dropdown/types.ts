import { MantineSize } from '@mantine/core';
import React, { RefObject } from 'react';
import { Props as ReactSelectProps } from 'react-select';
import { DropdownOption } from '../../types';

export interface DropdownProps extends Omit<ReactSelectProps, 'onChange'> {
  label?: string | React.ReactNode;
  upperCaseLabel?: boolean;
  onChange?: (value: DropdownOption | DropdownOption[], name: string, actionMeta?: any) => void;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  multiSelect?: boolean;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  autoSuggest?: boolean;
  placeholder?: string;
  creatable?: boolean;
  fluid?: boolean;
  showArrow?: boolean;
  info?: string;
  helperText?: string;
  error?: React.ReactNode;
  innerRef?: React.RefObject<HTMLSelectElement>;
  inputColor?: string;
  fontWeight?: 300 | 400 | 500 | 600 | 700;
  hint?: string | React.ReactNode;
  multiWrap?: boolean;
  wrapValues?: DropdownOption[];
  onMultiValueRemove?: (value: DropdownOption, index: number) => void;
  maxLength?: number;
  hasError?: boolean;
  customStyles?: any;
  showError?: boolean;
  defaultOptions?: DropdownOption[];
  loadOptions?: (inputValue: string, callback: (options: any) => void) => void;
  isInModal?: boolean;
  size?: MantineSize | number;
  fontSize?: MantineSize;
}

type PlacementType = 'top' | 'bottom' | 'auto';

export type DefaultMenuCompnentProps = {
  selectRef: RefObject<HTMLDivElement>;
  menuPlacementProp: 'top' | 'bottom' | 'auto';
  setMenuPlacement: (placement: PlacementType) => void;
  innerProps: any;
};

export type DropdownStylesProps = Pick<
  DropdownProps,
  | 'customStyles'
  | 'error'
  | 'autoSuggest'
  | 'inputColor'
  | 'fontWeight'
  | 'showArrow'
  | 'clearable'
  | 'disabled'
  | 'size'
  | 'fontSize'
>;

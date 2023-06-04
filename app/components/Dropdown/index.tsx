import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMantineTheme, Input } from '@mantine/core';

import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import AsyncCreatableSelect from 'react-select/async-creatable';

import { DropdownOption } from '../../types';
import usePrevious from './usePrevious';
import { DropdownProps, DropdownStylesProps } from './types';
import DefaultMenuCompnent from './MenuComponent';
import getDropdownStyles from './dropdownStyle';

const Dropdown = ({
  label,
  upperCaseLabel = false,
  required,
  multiSelect = false,
  disabled,
  name,
  placeholder = '',
  value,
  clearable,
  searchable,
  optional,
  creatable,
  autoSuggest = false,
  fluid = false,
  showArrow = true,
  hint,
  innerRef,
  inputColor = '#1e252a',
  fontWeight = 500,
  openMenuOnClick = true,
  multiWrap = false,
  wrapValues = [],
  onMultiValueRemove,
  className,
  maxMenuHeight = 328,
  tabSelectsValue = false,
  customStyles,
  components,
  showError = true,
  menuPosition = 'fixed',
  menuPlacement: menuPlacementProp = 'auto',
  onChange,
  onMenuClose,
  helperText,
  info,
  error,
  isInModal,
  openMenuOnFocus = false,
  defaultOptions,
  size,
  fontSize,
  ...props
}: DropdownProps) => {
  const theme = useMantineTheme();
  const [menuPlacement, setMenuPlacement] = useState('top');

  const prevMenuPlacementProp = usePrevious(menuPlacementProp);

  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prevMenuPlacementProp !== menuPlacementProp) {
      setMenuPlacement(menuPlacementProp);
    }
  }, [menuPlacementProp, prevMenuPlacementProp]);

  const handleChange = (val: DropdownOption, actionMeta: any) => {
    if (onChange && ((val && val.value) || clearable)) {
      onChange(val || {}, name || '', actionMeta);
    } else if (onChange && multiSelect) {
      onChange(val || [], name || '');
    }
  };

  let selectValue: any = value && (value as any).value ? value : '';
  if (multiSelect) {
    selectValue = value;
  }

  let Element: any = Select;
  if (creatable) {
    Element = autoSuggest ? AsyncCreatableSelect : CreatableSelect;
  } else if (autoSuggest) {
    Element = AsyncSelect;
  }

  const handleSetMenuPlacement = useCallback(placement => {
    setMenuPlacement(placement);
  }, []);

  const CustomMenu = useCallback(
    props => (
      <DefaultMenuCompnent
        selectRef={selectRef}
        menuPlacementProp={menuPlacementProp}
        setMenuPlacement={handleSetMenuPlacement}
        innerProps={props}
      />
    ),
    [menuPlacementProp, handleSetMenuPlacement]
  );

  const styleArgs = {
    size,
    customStyles,
    error,
    autoSuggest,
    inputColor,
    fontWeight,
    showArrow,
    clearable,
    disabled
  } as DropdownStylesProps;

  return (
    <>
      <Input.Wrapper required={required} label={label} error={error} size={fontSize}>
        <div ref={selectRef}>
          <Element
            openMenuOnClick={openMenuOnClick}
            name={name}
            {...(isInModal && {
              menuPortalTarget: document.body
            })}
            value={!multiWrap ? selectValue : ''}
            isMulti={multiSelect}
            placeholder={placeholder}
            onChange={handleChange}
            isDisabled={disabled}
            isSearchable={searchable}
            isClearable={clearable}
            tabSelectsValue={tabSelectsValue}
            openMenuOnFocus={openMenuOnFocus}
            defaultOptions={defaultOptions}
            styles={{
              ...getDropdownStyles(styleArgs, theme),
              ...(isInModal && { menuPortal: (base: any) => ({ ...base, zIndex: '9999 !important' }) })
            }}
            ref={selectRef}
            maxMenuHeight={maxMenuHeight}
            menuPlacement={menuPlacement}
            spellCheck={true}
            components={{
              Menu: CustomMenu,
              ...components
            }}
            {...props}
          />
        </div>
      </Input.Wrapper>
    </>
  );
};

export default Dropdown;

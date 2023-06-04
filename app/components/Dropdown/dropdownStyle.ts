import { MantineTheme } from '@mantine/core';
import { DropdownStylesProps } from './types';

const mergeStyle = (styleCallback: any, currStyle: any) => (styleCallback ? styleCallback(currStyle) : currStyle);

const sizes = {
  xs: 30,
  sm: 36,
  md: 42,
  lg: 50,
  xl: 60
} as const;

const getDropdownStyles = (
  {
    customStyles,
    error,
    autoSuggest,
    inputColor,
    fontWeight,
    showArrow,
    clearable,
    disabled,
    size,
    fontSize
  }: DropdownStylesProps,
  theme: MantineTheme
) => ({
  ...customStyles,
  container: (provided: any, state: any) =>
    mergeStyle(customStyles?.conatiner, {
      ...provided,
      zIndex: state.selectProps.menuIsOpen ? 2 : '0 !important'
    }),
  valueContainer: (provided: any) =>
    mergeStyle(customStyles?.valueContainer, {
      ...provided,
      padding: '0 15px'
    }),
  control: (provided: any, state: any) => {
    const borderColor = error ? theme.colors.danger[0] : state.isFocused ? theme.colors.info[4] : theme.colors.light[6];
    const currStyle = {
      ...provided,
      minHeight: 0,
      height: typeof size === 'number' ? `${size}px` : `${sizes[size || 'sm']}px`,
      padding: state.isFocused ? 0 : 1,
      borderRadius: theme.defaultRadius,
      backgroundColor: state.isFocused ? theme.white : theme.colors.light[0],
      border: state.isFocused ? `1px solid ${theme.colors.info[4]}` : `solid 1px ${borderColor}`,
      boxShadow: state.isFocused ? `0 0 0 2px ${theme.colors.info[0]}` : 'none',
      ...(disabled ? { backgroundColor: theme.colors.light[4], opacity: 0.6 } : {}),
      cursor: 'pointer',
      '&:hover': { borderColor },
      '&> div': { height: '100%' }
    };
    return mergeStyle(customStyles?.control, currStyle);
  },
  placeholder: (provided: any) =>
    mergeStyle(customStyles?.placeholder, {
      ...provided,
      fontSize: theme.fontSizes[fontSize || 'sm'],
      margin: 0,
      fontStyle: 'normal',
      fontWeight: 400,
      opacity: 0.5,
      lineHeight: 1
    }),
  singleValue: (provided: any, state: any) =>
    mergeStyle(customStyles?.singleValue, {
      ...provided,
      fontSize: theme.fontSizes[fontSize || 'sm'],
      margin: 0,
      fontStyle: 'normal',
      color: state.selectProps.menuIsOpen && autoSuggest ? 'transparent' : inputColor,
      ...(disabled ? { color: theme.colors.dark[0] } : {})
    }),
  multiValue: (provided: any) =>
    mergeStyle(customStyles?.multiValue, {
      ...provided,
      marginRight: '0.5rem'
    }),
  multiValueLabel: (provided: any) =>
    mergeStyle(customStyles?.multiValueLabel, {
      ...provided,
      fontSize: theme.fontSizes[fontSize || 'sm'],
      margin: 0,
      fontStyle: 'normal',
      color: theme.colors.dark[7],
      fontWeight,
      minWidth: '60px'
    }),
  multiValueRemove: (provided: any) =>
    mergeStyle(customStyles?.multiValueRemove, {
      ...provided,
      '&:hover': {
        backgroundColor: '#f7fafc',
        color: '#f7fafc'
      }
    }),
  input: (provided: any) =>
    mergeStyle(customStyles?.input, {
      ...provided,
      fontSize: theme.fontSizes[fontSize || 'sm'],
      margin: 0,
      fontStyle: 'normal',
      color: inputColor,
      ...(autoSuggest && { opacity: '1 !important' }),
      ...(!showArrow && { width: '100% !important' }),
      fontWeight,
      '& div:first-of-type': {
        ...(!showArrow && { width: '100% !important' })
      },
      '& input': {
        ...(autoSuggest && { opacity: '1 !important' }),
        ...(!showArrow && { width: '100% !important' })
      }
    }),
  indicatorsContainer: (provided: any) =>
    mergeStyle(customStyles?.indicatorsContainer, {
      ...provided,
      display: 'flex',
      height: '100%'
    }),
  clearIndicator: (provided: any) => ({
    ...provided,
    display: !clearable ? 'none' : 'flex',
    height: '100%',
    alignItems: 'center'
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    display: !showArrow ? 'none' : 'flex',
    height: '100%',
    alignItems: 'center'
  }),
  menu: (provided: any) =>
    mergeStyle(customStyles?.menu, {
      ...provided,
      padding: ' 0',
      margin: '0.25rem 0 0.25rem 0',
      borderRadius: theme.defaultRadius,
      boxShadow: '0 2px 21px -3px #a2b8d2'
    }),
  menuList: (provided: any) =>
    mergeStyle(customStyles?.menuList, {
      ...provided,
      scrollbarColor: '#D7E4EF',
      '&::-webkit-scrollbar': {
        width: '0.75rem'
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#D7E4EF',
        border: 'solid 0.125rem transparent',
        borderRadius: theme.defaultRadius,
        backgroundClip: 'content-box'
      }
    }),
  option: (provided: any, state: any) => {
    let backgroundColor = theme.white;
    let textColor = theme.colors.dark[6];
    if (state.isFocused) {
      backgroundColor = theme.colors.secondary[5];
      textColor = theme.white;
    } else if (state.isSelected) {
      backgroundColor = theme.colors.light[2];
      textColor = theme.colors.dark[6];
    } else if (state.isDisabled) {
      backgroundColor = 'transparent';
      textColor = theme.colors.light[6];
    }
    return mergeStyle(customStyles?.option, {
      ...provided,
      minHeight: '2.125rem',
      cursor: 'pointer',
      padding: '0.375rem 10px',
      display: 'flex',
      alignItems: 'center',
      fontSize: theme.fontSizes[fontSize || 'sm'],
      margin: 0,
      fontStyle: 'normal',
      color: textColor,
      fontWeight,
      backgroundColor,
      ...(!state.isDisabled && {
        '&:hover': {
          backgroundColor: theme.colors.secondary[5]
        }
      })
    });
  },
  indicatorSeparator: (provided: any) =>
    mergeStyle(customStyles?.indicatorSeparator, {
      ...provided,
      display: 'none'
    })
});

export default getDropdownStyles;

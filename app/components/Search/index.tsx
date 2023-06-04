import React from 'react';
import { ActionIcon, TextInput, useMantineTheme } from '@mantine/core';

import Icon from '../Icon';

import { SearchProps } from './types';

const Search = ({ value, placeholder, onSearch, ...props }: SearchProps) => {
  const theme = useMantineTheme();
  const icon = onSearch ? (
    <ActionIcon onClick={onSearch} sx={{ ':hover': { backgroundColor: 'transparent' } }}>
      <Icon name="search" size="1.5rem" color={theme.white} />
    </ActionIcon>
  ) : (
    <Icon name="search" size="1.5rem" color={theme.white} />
  );
  return (
    <TextInput
      placeholder={placeholder || 'Search'}
      rightSection={icon}
      value={value}
      {...props}
      styles={theme => ({
        root: { width: '60%' },
        input: {
          height: '45px',
          borderRadius: theme.defaultRadius,
          backgroundColor: theme.colors.secondary[3],
          color: theme.white,
          padding: '1rem 1.5rem',
          fontWeight: 600,
          fontSize: '16px',
          '::placeholder': { color: theme.white },
          ':focus': { borderColor: 'transparent' }
        },
        rightSection: { marginRight: '1rem' }
      })}
    />
  );
};
export default Search;

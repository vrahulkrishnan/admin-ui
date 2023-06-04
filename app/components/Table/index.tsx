import React from 'react';
import DataTable from 'react-data-table-component';
import { Loader, useMantineTheme, Pagination } from '@mantine/core';

import { DataTableProps } from './types';

export default function Table<C>({
  customStyles = {},
  selectableRows,
  pagination,
  page,
  total,
  onChange,
  zeroPad,
  noDataMessage,
  ...props
}: DataTableProps<C>) {
  const theme = useMantineTheme();

  const defaultCustomStyles = {
    table: {
      style: {
        borderTop: 0,
        backgroundColor: 'transparent'
      }
    },
    headRow: {
      style: {
        color: theme.colors.primary[5],
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.other.fontWeight[3],
        backgroundColor: 'transparent',
        border: 'none',
        height: '2.5rem',
        '& .mantine-Checkbox-input:not(:checked)': {
          backgroundColor: theme.white
        }
      }
    },
    rows: {
      style: {
        backgroundColor: theme.white,
        border: 'none !important',
        borderRadius: '2rem',
        marginBottom: '1rem',
        padding: '0.2rem 0'
      },
      highlightOnHoverStyle: {
        outline: '0'
      }
    },
    headCells: {
      style: {
        padding: '1.25rem',
        justifyContent: 'center',
        '&:first-of-type': {
          padding: '1.25rem 0 1.25rem calc(2rem - 2px)'
        },
        '&:last-of-type': {
          padding: '1.25rem 0 1.25rem 2rem'
        }
      }
    },
    cells: {
      style: {
        fontSize: theme.fontSizes.sm,
        color: '#7a7a7a',
        fontWeight: theme.other.fontWeight[2],
        padding: '0.75rem 1rem',
        '&:first-of-type': {
          padding: '0.75rem 0 0.75rem 2rem'
        },
        '&:last-of-type': {
          padding: '0.75rem 0 0.75rem 2rem'
        }
      }
    }
  };
  return (
    <>
      <DataTable
        {...props}
        customStyles={{
          ...defaultCustomStyles,
          ...customStyles
        }}
        progressComponent={<Loader mt={12} mb={8} color={theme.colors.primary[5]} variant="dots" />}
        highlightOnHover
        {...(selectableRows ? { selectableRows: true } : {})}
      />
      {pagination && (total || 0) > 1 && (
        <Pagination position="right" total={total || 0} page={page} onChange={onChange} sx={{ marginTop: '1rem' }} />
      )}
    </>
  );
}

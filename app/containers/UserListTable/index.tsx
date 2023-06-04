import React from 'react';

import { DataTable, Button, Icon, Group } from 'components';
import { createStyles } from '@mantine/core';

import { UserListTableProps } from './types';
import messages from './messages';

const useStyles = createStyles(() => ({
  textWrapper: {
    background: ' #f5f5f5',
    padding: '1rem 1.5rem',
    borderRadius: '2rem',
    width: '100%',
    margin: 'auto'
  }
}));

const columns = (onAction, classes) => [
  {
    name: messages.table.name,
    selector: row => row.firstName,
    sortable: true,
    cell: row => (
      <Group position="center" className={classes.textWrapper}>
        <Icon name="user" size="14" />
        {`${row.firstName} ${row.lastName}`}
      </Group>
    )
  },
  {
    name: messages.table.email,
    cell: row => (
      <Group position="center" className={classes.textWrapper}>
        {row.emailId}
      </Group>
    )
  },
  {
    name: messages.table.verified,
    selector: row => row.isVerified,
    sortable: true,
    cell: row => (
      <Group position="center" className={classes.textWrapper}>
        {row.isVerified ? 'Yes' : 'No'}
      </Group>
    )
  },
  {
    cell: row => <Button onClick={() => onAction(row.id)}>{messages.table.button}</Button>
  }
];

export const UserListTable = ({ data, handleView, totalPages, currentPage, handlePagination }: UserListTableProps) => {
  const { classes } = useStyles();
  return (
    <DataTable
      columns={columns(handleView, classes)}
      total={totalPages}
      page={currentPage}
      data={data}
      pagination
      onChange={handlePagination}
      persistTableHead
    />
  );
};

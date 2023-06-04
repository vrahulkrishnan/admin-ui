import React from 'react';
import { DateTime } from 'luxon';
import { createStyles, Tooltip } from '@mantine/core';

import { DataTable, Button, Group, Typography } from 'components';
import { DATE_FORMAT } from 'config';

import { EntryListTableProps } from './types';
import messages from './messages';

const useStyles = createStyles(() => ({
  textWrapper: {
    background: ' #f5f5f5',
    padding: '1rem',
    borderRadius: '2rem',
    width: '100%',
    margin: 'auto'
  }
}));

const columns = (onAction, classes) => [
  {
    name: messages.table.activityName,
    selector: row => row.activityName,
    sortable: true,
    cell: row => (
      <Group position="center" className={classes.textWrapper}>
        <Tooltip label={row.activity.title}>
          <Typography data-tag="allowRowEvents" lineClamp={1} size="sm">
            {row.activity.title}
          </Typography>
        </Tooltip>
      </Group>
    )
  },
  {
    name: messages.table.username,
    cell: row => (
      <Group position="center" className={classes.textWrapper}>
        {row.user.firstName}
      </Group>
    )
  },
  {
    name: messages.table.location,
    selector: row => row.verified,
    sortable: true,
    cell: row => (
      <Group position="center" className={classes.textWrapper}>
        {row.activity.restaurant.name}
      </Group>
    )
  },
  {
    name: messages.table.date,
    selector: row => row.date,
    sortable: true,
    cell: row => (
      <Group position="center" className={classes.textWrapper}>
        {DateTime.fromJSDate(new Date(row.createdAt)).toFormat(DATE_FORMAT.VIEW)}
      </Group>
    )
  },
  {
    name: messages.table.status,
    selector: row => row.status,
    sortable: true,
    cell: row => (
      <Group position="center" sx={{ textTransform: 'capitalize' }} className={classes.textWrapper}>
        {row.status}
      </Group>
    )
  },
  {
    cell: row => <Button onClick={() => onAction(row.id)}>{messages.table.button}</Button>
  }
];

export const EntryListTable = ({ data, handleView, handlePagination }: EntryListTableProps) => {
  const { classes } = useStyles();
  return (
    <DataTable
      columns={columns(handleView, classes)}
      data={data.data}
      page={data.currentPage}
      total={data.totalPages}
      pagination
      onChange={handlePagination}
      persistTableHead
    />
  );
};

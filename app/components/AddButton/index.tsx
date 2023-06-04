import React from 'react';
import { ActionIcon, Group, useMantineTheme } from '@mantine/core';

import Typography from '../Typography';
import { AddButtonProps } from './types';

export default function AddButton({ label, onClick, labelColor = 'gray' }: AddButtonProps) {
  const theme = useMantineTheme();
  return (
    <Group spacing={8}>
      <Typography color={labelColor} size="md" weight={500}>
        {label}
      </Typography>
      <ActionIcon
        variant="filled"
        sx={{
          height: '45px',
          width: '45px',
          borderRadius: '50%',
          backgroundColor: theme.colors.secondary[5],
          ':hover': { backgroundColor: theme.colors.secondary[3] }
        }}
        onClick={onClick}
      >
        <Typography size={40}>+</Typography>
      </ActionIcon>
    </Group>
  );
}

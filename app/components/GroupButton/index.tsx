import React from 'react';
import { Group, Button } from '@mantine/core';

import Typography from '../Typography';
import { GroupButtonProps } from './types';

export default function GroupButton({ left, right, size = 'md' }: GroupButtonProps) {
  return (
    <Group sx={{ width: size === 'lg' ? 250 : 225, position: 'relative' }}>
      {!left.hide && (
        <Button
          styles={theme => ({
            root: {
              border: '1px',
              backgroundColor: theme.colors.secondary[3],
              borderRadius: theme.defaultRadius,
              padding: '0.75rem 1.5rem',
              width: '200px',
              height: '50px',
              cursor: 'pointer',
              ':hover': {
                backgroundColor: theme.colors.secondary[3]
              }
            },
            inner: { justifyContent: 'flex-start' }
          })}
          {...(left.onClick && { onClick: left.onClick })}
          {...(left.type && { type: left.type })}
        >
          <Typography sx={theme => ({ color: theme.white, fontWeight: 600, fontSize: '16px' })} align="center">
            {left.label}
          </Typography>
        </Button>
      )}
      <Button
        sx={theme => ({
          border: '1px',
          backgroundColor: theme.colors.secondary[5],
          borderRadius: theme.defaultRadius,
          padding: '0.75rem 1.5rem',
          width: 125,
          height: '50px',
          position: 'absolute',
          right: 0,
          cursor: 'pointer'
        })}
        {...(right.onClick && { onClick: right.onClick })}
        {...(right.type && { type: right.type })}
      >
        <Typography sx={theme => ({ color: theme.white, fontWeight: 600, fontSize: '16px' })} align="center">
          {right.label}
        </Typography>
      </Button>
    </Group>
  );
}

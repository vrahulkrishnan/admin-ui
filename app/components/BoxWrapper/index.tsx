import React from 'react';
import { Box, createStyles } from '@mantine/core';

import { BoxWrapperProps } from './types';

const useStyles = createStyles((theme, { color }: { color: 'white' | 'gray' }) => {
  return {
    wrapper: {
      position: 'relative',
      backgroundColor: color === 'white' ? theme.white : '#f5f5f5',
      padding: '1rem 1.5rem',
      borderRadius: theme.defaultRadius
    }
  };
});

export default function BoxWrapper({ children, color = 'white', ...other }: BoxWrapperProps) {
  const { classes } = useStyles({ color });
  return (
    <Box className={classes.wrapper} p="1rem 1.5rem" {...other}>
      {children}
    </Box>
  );
}

import React from 'react';
import { LoadingOverlay, LoadingOverlayProps, useMantineTheme } from '@mantine/core';

export default function LoadingIndicator({ loaderProps, ...props }: LoadingOverlayProps) {
  const theme = useMantineTheme();

  return (
    <LoadingOverlay
      loaderProps={{ ...loaderProps, color: theme.colors.primary[5] }}
      {...props}
      sx={{
        height: '100%',
        position: 'fixed'
      }}
    />
  );
}

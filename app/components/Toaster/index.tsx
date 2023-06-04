import { Notification } from '@mantine/core';
import React from 'react';

import { ToasterProps } from './types';

const Toaster = ({ type = 'info', ...props }: ToasterProps) => {
  return (
    <Notification
      color={type}
      styles={theme => {
        const selectedColor = theme.colors[type][5];
        return {
          root: {
            backgroundColor: theme.colors[type]['1'],
            border: `1px solid ${selectedColor}`
          },
          title: { color: selectedColor },
          closeButton: {
            background: selectedColor,
            '&:hover': {
              background: selectedColor
            }
          }
        };
      }}
      {...props}
    />
  );
};

export default Toaster;

import React from 'react';
import { BoxProps } from '@mantine/core';

export interface BoxWrapperProps extends BoxProps {
  children: React.ReactNode;
  color?: 'white' | 'gray';
}

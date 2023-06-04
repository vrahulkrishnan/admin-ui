import { NotificationProps } from '@mantine/core';

export type ColorTypes = 'info' | 'warning' | 'danger' | 'success';

export declare type ToasterProps = Omit<NotificationProps, 'color'> & {
  children: React.ReactNode;
  type?: ColorTypes;
};

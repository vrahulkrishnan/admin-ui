import { Tuple, DefaultMantineColor } from '@mantine/core';

// We need to tell TypeScript that when we write "import styles from './styles.scss' we mean to load a module (to look for a './styles.scss.d.ts').
declare module '*.scss';
declare module '*.svg';
declare module '*.jpg';
declare module '*.png';

type ExtendedCustomColors =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'dark'
  | 'light'
  | 'info'
  | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}

import { MantineThemeOverride } from '@mantine/core';

import { colors } from './color';
import { styles } from './styles';

const theme: MantineThemeOverride = {
  fontFamily: 'Montserrat, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  primaryShade: 5,
  colors: colors,
  primaryColor: 'primary',
  white: '#ffffff',
  black: '#000000',
  lineHeight: 1.5,
  fontSizes: { xs: 12, sm: 14, md: 16, lg: 18, xl: 22 },
  headings: {
    fontFamily: 'Montserrat, sans-serif'
  },
  defaultRadius: '2rem',
  other: {
    fontWeight: [300, 400, 500, 600]
  },
  components: styles
};

export { theme };

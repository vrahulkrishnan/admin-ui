import React from 'react';
import { Text, TextProps } from '@mantine/core';

const Typography = React.forwardRef(({ children, ...props }: TextProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  return (
    <Text {...props} ref={ref}>
      {children}
    </Text>
  );
});

Typography.displayName = 'Typography';

export default Typography;

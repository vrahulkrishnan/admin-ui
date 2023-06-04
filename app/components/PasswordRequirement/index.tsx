import { Box, Center } from '@mantine/core';
import React from 'react';

import Typography from '../Typography';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Typography color={meets ? 'teal' : 'red'} mt={5} size="sm">
      <Center inline>
        <Box ml={7}>{label}</Box>
      </Center>
    </Typography>
  );
}

export default PasswordRequirement;

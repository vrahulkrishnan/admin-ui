import React, { useRef } from 'react';
import { Group, Stack, Anchor, FileButton, createStyles, Box, ActionIcon } from '@mantine/core';

import Icon from '../Icon';
import Typography from '../Typography';
import { SingleFileInputProps } from './types';

const useStyles = createStyles(theme => {
  return {
    box: { position: 'relative', width: '50px', height: '50px' },
    image: {
      width: '100%',
      height: '100%'
    },
    close: {
      position: 'absolute',
      top: '-12px',
      right: '-12px'
    }
  };
});

export default function SingleFileInput({ label, value, icon, onChange, error, onClose }: SingleFileInputProps) {
  const { classes } = useStyles();
  const resetRef = useRef<() => void>(null);
  return (
    <Stack spacing={!value ? 0 : 8}>
      <Group spacing={5}>
        {icon && <Icon name={icon} size="16" />}
        <FileButton onChange={onChange} resetRef={resetRef} accept="image/png,image/jpeg">
          {props => (
            <Anchor sx={{ color: '#7b7b7b' }} {...props}>
              <Typography>{label}</Typography>
            </Anchor>
          )}
        </FileButton>
      </Group>
      {value && (
        <Box className={classes.box}>
          <img
            className={classes.image}
            src={value instanceof File ? URL.createObjectURL(value) : value.imageUrl}
            alt={(value as File).name}
          />
          {onClose && (
            <ActionIcon
              className={classes.close}
              onClick={() => {
                resetRef.current?.();
                onClose(value instanceof File ? null : value);
              }}
              sx={{ ':hover': { background: 'transparent' } }}
            >
              <Icon name="close-circle" size="1rem" />
            </ActionIcon>
          )}
        </Box>
      )}
      {error && (
        <Typography sx={theme => ({ color: theme.colors.danger[0] })} size="sm">
          {error}
        </Typography>
      )}
    </Stack>
  );
}

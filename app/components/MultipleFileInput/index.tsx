import React, { useRef } from 'react';
import { Group, Stack, Anchor, FileButton, createStyles, Box, ActionIcon } from '@mantine/core';

import { ServerFileType } from 'types';
import Icon from '../Icon';
import Typography from '../Typography';
import { MultipleFileInputProps } from './types';

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

export default function MultipleFileInput({ label, value, icon, onChange, onClose }: MultipleFileInputProps) {
  const { classes } = useStyles();
  const resetRef = useRef<() => void>(null);
  return (
    <Stack spacing={!(value && value.length) ? 0 : 8}>
      <Group spacing={5}>
        {icon && <Icon name={icon} size="16" />}
        <FileButton onChange={onChange} resetRef={resetRef} multiple accept="image/png,image/jpeg">
          {props => (
            <Anchor sx={{ color: '#7b7b7b' }} {...props}>
              <Typography>{label}</Typography>
            </Anchor>
          )}
        </FileButton>
      </Group>
      {value && value.map.length > 0 && (
        <Group>
          {value.map((item: File | ServerFileType, ind) => (
            <Box className={classes.box} key={ind}>
              <img
                className={classes.image}
                src={item instanceof File ? URL.createObjectURL(item) : item.imageUrl}
                alt=""
              />
              {onClose && (
                <ActionIcon
                  className={classes.close}
                  onClick={() => {
                    resetRef.current?.();
                    onClose(item);
                  }}
                  sx={{ ':hover': { background: 'transparent' } }}
                >
                  <Icon name="close-circle" size="1rem" />
                </ActionIcon>
              )}
            </Box>
          ))}
        </Group>
      )}
    </Stack>
  );
}

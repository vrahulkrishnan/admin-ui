import React from 'react';
import { createStyles } from '@mantine/core';

import { Box, BoxWrapper, Group, Image, Stack, Typography, Title, ActionIcon, Icon, Button } from 'components';
import { DetailContainerProps } from './types';

const useStyles = createStyles(theme => {
  return {
    imageBox: { width: '400px', height: 'auto', position: 'relative' },
    image: {
      width: '100%',
      height: '100%'
    },
    gallery: {
      position: 'absolute',
      right: '8px',
      bottom: '8px',
      border: '1px',
      backgroundColor: theme.colors.secondary[5],
      borderRadius: theme.defaultRadius,
      cursor: 'pointer',
      ':hover': {
        backgroundColor: theme.colors.secondary[3]
      }
    },
    textContent: { flex: 1 },
    editIcon: {
      position: 'absolute',
      top: '8px',
      right: '16px',
      width: 'unset',
      height: 'unset'
    },
    closeIcon: {
      position: 'absolute',
      top: '8px',
      right: '50px',
      width: 'unset',
      height: 'unset'
    }
  };
});

export const DetailContainer = ({
  id,
  mainImage,
  name,
  description,
  galleryImages,
  onAction,
  onView
}: DetailContainerProps) => {
  const { classes } = useStyles();
  return (
    <BoxWrapper p="0">
      <Group spacing={0}>
        <Box className={classes.imageBox}>
          <Image
            src={mainImage.imageUrl}
            styles={theme => ({
              image: { borderTopLeftRadius: theme.defaultRadius, borderBottomLeftRadius: theme.defaultRadius }
            })}
            className={classes.image}
          />
          {galleryImages.length > 0 && (
            <Button className={classes.gallery} onClick={onView}>
              <Typography sx={theme => ({ color: theme.white, fontWeight: 600, fontSize: '16px' })} align="center">
                Gallery
              </Typography>
            </Button>
          )}
        </Box>
        <Stack spacing={4} className={classes.textContent} px={36}>
          <Title color="primary" order={2}>
            {name}
          </Title>
          <Typography size="sm">{description}</Typography>
        </Stack>
      </Group>
      <ActionIcon
        className={classes.closeIcon}
        onClick={() => {
          if (id) {
            onAction('delete', id);
          }
        }}
      >
        <Icon name="close-circle" size="24" />
      </ActionIcon>
      <ActionIcon
        className={classes.editIcon}
        onClick={() => {
          if (id) {
            onAction('edit', id);
          }
        }}
      >
        <Icon name="edit" size="24" />
      </ActionIcon>
    </BoxWrapper>
  );
};

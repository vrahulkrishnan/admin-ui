import React from 'react';
import { createStyles } from '@mantine/core';
import { useHover } from '@mantine/hooks';

import { Box, BoxWrapper, Group, Image, Stack, Typography, Title, GroupButton, ActionIcon, Icon } from 'components';
import { ListItemContainerProps } from './types';

const useStyles = createStyles(theme => {
  return {
    close: {
      position: 'absolute',
      top: '8px',
      right: '8px'
    }
  };
});

export const ListItemContainer = ({ id, mainImage, name, description, onAction, editOnly }: ListItemContainerProps) => {
  const { classes } = useStyles();
  const { hovered, ref } = useHover();

  return (
    <div ref={ref}>
      <BoxWrapper color="gray" p="1.5rem">
        <Group spacing={36}>
          <Box sx={{ width: '175px', height: '175px' }}>
            <Image
              src={mainImage.imageUrl}
              styles={theme => ({ image: { borderRadius: theme.defaultRadius, minHeight: '175px' } })}
            />
          </Box>
          <Stack spacing={4} sx={{ flex: 1 }}>
            <Title color="primary" order={2}>
              {name}
            </Title>
            <Typography size="sm" lineClamp={4}>
              {description}
            </Typography>
          </Stack>
          <GroupButton
            left={{
              label: 'View',
              onClick: () => {
                onAction('view', id);
              },
              hide: editOnly
            }}
            right={{
              label: 'Edit',
              onClick: () => {
                onAction('edit', id);
              }
            }}
          />
        </Group>
        {hovered && (
          <ActionIcon
            onClick={() => {
              onAction('delete', id);
            }}
            className={classes.close}
          >
            <Icon name="close-circle" size="1rem" />
          </ActionIcon>
        )}
      </BoxWrapper>
    </div>
  );
};

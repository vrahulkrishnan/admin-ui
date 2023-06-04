import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import { createStyles } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';

import {
  Avatar,
  Box,
  Group,
  LoadingIndicator,
  SimpleGrid,
  Stack,
  Title,
  Typography,
  ScrollArea,
  Paper,
  Image
} from 'components';
import { useInjectSaga, useInjectReducer } from 'utils';
import { DATE_FORMAT } from 'config';

import { imageMap } from '../../.images';

import saga from './saga';
import reducer from './reducer';
import * as Selectors from './selectors';
import { UserManagementProps } from './types';
import messages from './messages';
import * as Actions from './actions';

const key = 'user';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  user: Selectors.makeSelectUser(),
  activities: Selectors.makeSelectActivities()
});

const useStyles = createStyles(() => ({
  label: {
    flex: '0 0 35%',
    maxWidth: '35%',
    color: '#a5a5a5'
  }
}));

export default function UserDetailsManagement(props: UserManagementProps) {
  const { loading, user, activities } = useSelector(stateSelector);
  const { ref, height } = useElementSize();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(Actions.getUser(id));
      dispatch(Actions.getActivityByUser(id));
    }
  }, [id]);

  return (
    <>
      <Helmet
        titleTemplate={messages.details.title}
        defaultTitle={messages.details.title}
        title={messages.details.title}
      />
      <LoadingIndicator visible={loading} />
      <Title order={2} color="#7b7b7b" py={16}>
        {messages.details.title}
      </Title>
      <Box
        my="lg"
        sx={{ width: '90%', height: 'calc(100% - var(--mantine-header-height))', backgroundColor: 'transparent' }}
      >
        <SimpleGrid
          sx={{ height: '100%' }}
          cols={2}
          spacing="xl"
          breakpoints={[
            { maxWidth: 980, cols: 1, spacing: 'md' },
            { maxWidth: 755, cols: 1, spacing: 'sm' },
            { maxWidth: 600, cols: 1, spacing: 'sm' }
          ]}
        >
          <Box
            ref={ref}
            sx={theme => ({ backgroundColor: theme.white, borderRadius: theme.defaultRadius, padding: '2rem' })}
          >
            <Stack spacing="sm" p="lg" sx={{ height: '100%' }}>
              <Avatar src={user?.image?.imageUrl || imageMap['user-pic-png']()} size={120} radius={120} />
              <Typography size="md" color="primary" weight={500} mt="md">
                {`${user.firstName} ${user.lastName}`}
              </Typography>
              <Group>
                <Typography className={classes.label}>{messages.details.email}</Typography>
                <Typography color="primary" weight="600">
                  {user.emailId}
                </Typography>
              </Group>
              <Group>
                <Typography className={classes.label}>{messages.details.phone}</Typography>
                <Typography color="primary" weight="600">
                  {user?.phone}
                </Typography>
              </Group>
              {user?.country && (
                <Group>
                  <Typography className={classes.label}>{messages.details.country}</Typography>
                  <Typography color="primary" weight="600">
                    {user?.country}
                  </Typography>
                </Group>
              )}
              {user?.city && (
                <Group>
                  <Typography className={classes.label}>{messages.details.city}</Typography>
                  <Typography color="primary" weight="600">
                    {user?.city}
                  </Typography>
                </Group>
              )}
            </Stack>
          </Box>
          <Box sx={{ height: '100%' }}>
            <ScrollArea style={{ height: height + 56 }} offsetScrollbars scrollbarSize={6}>
              {activities.map((item, i) => (
                <Paper p="md" key={i} mb="lg">
                  <Group position="apart" my="sm">
                    <Typography color="#7b7b7b" weight={500}>
                      {item.activity.title}
                    </Typography>
                    <Typography color="primary" weight={500}>
                      {DateTime.fromJSDate(new Date(item.createdAt)).toFormat(DATE_FORMAT.VIEW)}
                    </Typography>
                  </Group>
                  <Image src={item.image.imageUrl} radius="lg" />
                </Paper>
              ))}
            </ScrollArea>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
}

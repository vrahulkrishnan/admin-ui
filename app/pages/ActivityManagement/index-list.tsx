import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useDebouncedValue, useShallowEffect } from '@mantine/hooks';

import { LoadingIndicator, Title, BoxWrapper, Search, Group, AddButton, Stack, Typography } from 'components';
import { ListItemContainer } from 'containers';
import { useInjectSaga, useInjectReducer, localRedirect } from 'utils';

import saga from './saga';
import reducer from './reducer';
import * as Selectors from './selectors';
import * as Actions from './actions';
import { ActivityManagementProps } from './types';
import messages from './messages';

const key = 'activity';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  activities: Selectors.makeSelectActivities()
});

export default function RestaurantListManagement(props: ActivityManagementProps) {
  const dispatch = useDispatch();
  const { loading, activities } = useSelector(stateSelector);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [search, setSearch] = React.useState('');
  const [debouncedValue] = useDebouncedValue(search, 500);

  useShallowEffect(() => {
    dispatch(Actions.getActivityList(debouncedValue));
  }, [debouncedValue]);

  const handleAddLocation = () => {
    localRedirect(`/activities/new`);
  };

  const handleAction = (type: 'view' | 'edit' | 'delete', id: string) => {
    switch (type) {
      case 'view':
        localRedirect(`/activities/${id}`);
        break;
      case 'edit':
        localRedirect(`/activities/${id}/update`);
        break;
      case 'delete':
        dispatch(Actions.deleteActivity(Number(id)));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Helmet titleTemplate={messages.list.title} defaultTitle={messages.list.title} title={messages.list.title} />
      <LoadingIndicator visible={loading} />
      <Title order={2} color="#7b7b7b" py={16}>
        {messages.list.title}
      </Title>
      <BoxWrapper sx={{ width: '90%' }}>
        <Group position="apart" pb={32}>
          <Search
            value={search}
            placeholder="Search"
            onChange={e => {
              setSearch(e.target.value);
            }}
          />
          <AddButton label={messages.list.button} onClick={handleAddLocation} />
        </Group>
        <Stack>
          {(activities || []).map((activity, index) => (
            <ListItemContainer key={index} {...activity} name={activity.title} onAction={handleAction} />
          ))}
        </Stack>
        {activities.length === 0 && (
          <Typography py={50} align="center">
            No Activities found
          </Typography>
        )}
      </BoxWrapper>
    </>
  );
}

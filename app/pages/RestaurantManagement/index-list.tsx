import React, { useEffect } from 'react';
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
import { RestaurantManagementProps } from './types';
import messages from './messages';

const key = 'restaurant';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  restaurants: Selectors.makeSelectRestaurants()
});

export default function RestaurantListManagement(props: RestaurantManagementProps) {
  const dispatch = useDispatch();
  const { loading, restaurants } = useSelector(stateSelector);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [search, setSearch] = React.useState('');
  const [debouncedValue] = useDebouncedValue(search, 500);

  useShallowEffect(() => {
    dispatch(Actions.getRestaurantList(debouncedValue));
  }, [debouncedValue]);

  useEffect(() => {
    dispatch(Actions.getRestaurantList());
  }, []);

  const handleAddLocation = () => {
    localRedirect(`/restaurants/new`);
  };

  const handleAction = (type: 'view' | 'edit' | 'delete', id: string) => {
    switch (type) {
      case 'view':
        localRedirect(`/restaurants/${id}`);
        break;
      case 'edit':
        localRedirect(`/restaurants/${id}/update`);
        break;
      case 'delete':
        dispatch(Actions.deleteRestaurant(Number(id)));
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
          {(restaurants || []).map((restaurant, index) => (
            <ListItemContainer key={index} {...restaurant} onAction={handleAction} />
          ))}
        </Stack>
        {restaurants.length === 0 && (
          <Typography py={50} align="center">
            No Restaurants found
          </Typography>
        )}
      </BoxWrapper>
    </>
  );
}

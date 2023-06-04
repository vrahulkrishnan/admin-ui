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
import { LocationManagementProps } from './types';
import messages from './messages';

const key = 'location';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  locations: Selectors.makeSelectLocations()
});

export default function LocationListManagement(props: LocationManagementProps) {
  const dispatch = useDispatch();
  const { loading, locations } = useSelector(stateSelector);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [search, setSearch] = React.useState('');
  const [debouncedValue] = useDebouncedValue(search, 500);

  useShallowEffect(() => {
    dispatch(Actions.getLocationList(debouncedValue));
  }, [debouncedValue]);

  useEffect(() => {
    dispatch(Actions.getLocationList());
  }, []);

  const handleAddLocation = () => {
    localRedirect(`/locations/new`);
  };

  const handleAction = (type: 'view' | 'edit' | 'delete', id: string) => {
    switch (type) {
      case 'view':
        localRedirect(`/locations/${id}`);
        break;
      case 'edit':
        localRedirect(`/locations/${id}/update`);
        break;
      case 'delete':
        dispatch(Actions.deleteLocation(Number(id)));
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
          {(locations || []).map((location, index) => (
            <ListItemContainer key={index} {...location} onAction={handleAction} />
          ))}
        </Stack>
        {locations.length === 0 && (
          <Typography py={50} align="center">
            No Locations found
          </Typography>
        )}
      </BoxWrapper>
    </>
  );
}

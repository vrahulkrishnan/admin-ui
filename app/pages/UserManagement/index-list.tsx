import React, { useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { useDebouncedValue, useShallowEffect } from '@mantine/hooks';

import { LoadingIndicator, Title, BoxWrapper, Box, Search, Group } from 'components';
import { useInjectSaga, useInjectReducer, localRedirect, getDecodedQueryParams, getEncodedQueryParams } from 'utils';
import { UserListTable } from 'containers';

import saga from './saga';
import reducer from './reducer';
import * as Selectors from './selectors';
import * as Actions from './actions';
import { UserManagementProps } from './types';
import messages from './messages';

const key = 'user';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  users: Selectors.makeSelectUsers()
});

export default function UserListManagement(props: UserManagementProps) {
  const dispatch = useDispatch();
  const { loading, users } = useSelector(stateSelector);
  useInjectReducer({ key, reducer });
  const { pathname } = useLocation();
  const params = getDecodedQueryParams() as { page: string };
  useInjectSaga({ key, saga });

  const [search, setSearch] = React.useState('');
  const [debouncedValue] = useDebouncedValue(search, 500);

  useEffect(() => {
    dispatch(Actions.getUserList({ page: Number(params.page) || 1 }));
  }, [params.page]);

  useShallowEffect(() => {
    if (debouncedValue) {
      dispatch(Actions.getUserList({ search: debouncedValue, page: Number(params.page) || 1 }));
    }
  }, [debouncedValue]);

  const handlePagination = useCallback(
    (page: number) => {
      const search = getEncodedQueryParams({ page: String(page) });
      localRedirect(pathname, { search });
    },
    [pathname]
  );

  const handleAction = (id: number) => {
    localRedirect(`/users/${id}`);
  };

  const { currentPage, totalPages, data } = users;

  return (
    <>
      <Helmet titleTemplate={messages.list.title} defaultTitle={messages.list.title} title={messages.list.title} />
      <LoadingIndicator visible={loading} />
      <Title order={2} color="#7b7b7b" py={16}>
        {messages.list.title}
      </Title>
      <BoxWrapper sx={{ width: '90%' }}>
        <Group position="apart" py={16}>
          <Search
            value={search}
            placeholder="Search"
            onChange={e => {
              setSearch(e.target.value);
            }}
          />
        </Group>
      </BoxWrapper>
      <Box my="lg" sx={{ width: '90%', backgroundColor: 'transparent' }}>
        <UserListTable
          handlePagination={handlePagination}
          data={data}
          currentPage={currentPage}
          totalPages={totalPages}
          handleView={handleAction}
        />
      </Box>
    </>
  );
}

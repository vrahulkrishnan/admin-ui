import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { find, isEmpty } from 'lodash';
import { useDebouncedValue, useShallowEffect } from '@mantine/hooks';
import { useLocation } from 'react-router-dom';

import { LoadingIndicator, Title, BoxWrapper, Box, Search, Group } from 'components';
import { useInjectSaga, useInjectReducer, getDecodedQueryParams, getEncodedQueryParams, localRedirect } from 'utils';
import { EntryListTable } from 'containers';

import saga from './saga';
import reducer from './reducer';
import * as Selectors from './selectors';
import * as Actions from './actions';
import { EntriesManagementProps } from './types';
import messages from './messages';
import EntryModal from './modal';

const key = 'entry';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  entryList: Selectors.makeSelectEntries(),
  exitModal: Selectors.makeSelectExitModal()
});

export default function EntriesManagement(props: EntriesManagementProps) {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [entryDetails, setEntryDetails] = useState({});
  const { pathname } = useLocation();
  const params = getDecodedQueryParams() as { page: string };
  const { loading, entryList, exitModal } = useSelector(stateSelector);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [search, setSearch] = React.useState('');
  const [debouncedValue] = useDebouncedValue(search, 500);

  useShallowEffect(() => {
    if (debouncedValue) {
      dispatch(Actions.getEntryList({ search: debouncedValue, page: Number(params.page) || 1 }));
    }
  }, [debouncedValue]);

  const handlePagination = useCallback(
    (page: number) => {
      const search = getEncodedQueryParams({ page: String(page) });
      localRedirect(pathname, { search });
    },
    [pathname]
  );

  useEffect(() => {
    dispatch(Actions.getEntryList({ page: Number(params.page) || 1 }));
  }, [params.page]);

  const handleAction = (id: number) => {
    setEntryDetails(find(entryList.data, { id }) || {});
    setModalOpen(true);
  };

  const handleEntryAction = (status: 'approved' | 'rejected', id: string) => {
    dispatch(Actions.postEntryFeedback(id, status));
  };

  useEffect(() => {
    if (exitModal) {
      setModalOpen(false);
      dispatch(Actions.getEntryList({ page: Number(params.page) || 1 }));
    }
  }, [exitModal]);

  return (
    <>
      <Helmet titleTemplate={messages.list.title} defaultTitle={messages.list.title} title={messages.list.title} />
      {!isEmpty(entryDetails) && isModalOpen && (
        <EntryModal
          onAction={handleEntryAction}
          opened={isModalOpen}
          onClose={() => setModalOpen(prev => !prev)}
          data={entryDetails}
        />
      )}

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
        <EntryListTable handlePagination={handlePagination} data={entryList} handleView={handleAction} />
      </Box>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';

import { LoadingIndicator, Title, Group, AddButton, GalleryModal } from 'components';
import { useInjectSaga, useInjectReducer, localRedirect } from 'utils';
import { DetailContainer } from 'containers';
import saga from './saga';
import reducer from './reducer';
import * as Selectors from './selectors';
import * as Actions from './actions';
import { LocationManagementProps } from './types';
import messages from './messages';

const key = 'location';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  location: Selectors.makeSelectLocation()
});

export default function LocationDetailsManagement(props: LocationManagementProps) {
  const dispatch = useDispatch();
  const { loading, location } = useSelector(stateSelector);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      setTimeout(() => {
        dispatch(Actions.getLocation(id));
      });
    }
    return () => {
      dispatch(Actions.resetRedux('location'));
    };
  }, [id]);

  const handleAction = (type: 'add' | 'edit' | 'delete', id?: string) => {
    switch (type) {
      case 'add':
        localRedirect(`/locations/new`);
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

  const handleView = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Helmet
        titleTemplate={messages.details.title}
        defaultTitle={messages.details.title}
        title={messages.details.title}
      />
      <LoadingIndicator visible={loading} />
      <GalleryModal
        opened={isModalOpen}
        onClose={() => setModalOpen(prev => !prev)}
        images={location.galleryImages || []}
      />
      <Group position="apart" py={32}>
        <Title order={2} color="#7b7b7b">
          {messages.details.title}
        </Title>
        <AddButton
          label={messages.details.button}
          labelColor="primary"
          onClick={() => {
            handleAction('add');
          }}
        />
      </Group>
      {location && !isEmpty(location) && <DetailContainer {...location} onAction={handleAction} onView={handleView} />}
    </>
  );
}

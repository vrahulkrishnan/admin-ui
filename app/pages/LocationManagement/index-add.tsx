import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { ServerFileType } from 'types';

import { LoadingIndicator, Title, BoxWrapper } from 'components';
import { useInjectSaga, useInjectReducer, localRedirect } from 'utils';

import saga from './saga';
import reducer from './reducer';
import * as Selectors from './selectors';
import * as Actions from './actions';
import { LocationFormTypes, LocationManagementProps } from './types';
import { LocationForm } from './containers';

import messages from './messages';

const key = 'location';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  location: Selectors.makeSelectLocation()
});

export default function LocationAddManagement(props: LocationManagementProps) {
  const dispatch = useDispatch();
  const { loading, location } = useSelector(stateSelector);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { id } = useParams<{ id: string }>();

  const isEdit = Boolean(id);

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

  const handleViewAll = () => {
    localRedirect(`/locations`);
  };

  const handleSubmit = (location: LocationFormTypes, deletedImages: ServerFileType[]) => {
    if (isEdit) {
      dispatch(Actions.updateLocation(location, deletedImages));
    } else {
      dispatch(Actions.addLocation(location));
    }
  };

  const title = isEdit ? messages.update.title : messages.add.title;
  return (
    <>
      <Helmet titleTemplate={title} defaultTitle={title} title={title} />
      <LoadingIndicator visible={loading} />
      <Title order={2} color="#7b7b7b" py={16}>
        {title}
      </Title>
      <BoxWrapper sx={{ width: '90%' }} p="3rem">
        <LocationForm isEdit={isEdit} onView={handleViewAll} onSubmit={handleSubmit} data={location} />
      </BoxWrapper>
    </>
  );
}

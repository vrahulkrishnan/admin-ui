import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';

import { LoadingIndicator, Title, BoxWrapper } from 'components';
import { useInjectSaga, useInjectReducer, localRedirect } from 'utils';
import { ServerFileType } from 'types';

import saga from './saga';
import reducer from './reducer';
import * as Selectors from './selectors';
import * as Actions from './actions';
import { RestaurantFormTypes, RestaurantManagementProps } from './types';
import messages from './messages';
import { RestaurantForm } from './containers';

const key = 'restaurant';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  restaurant: Selectors.makeSelectRestaurant(),
  locations: Selectors.makeSelectLocations()
});

export default function RestaurantAddManagement(props: RestaurantManagementProps) {
  const dispatch = useDispatch();
  const { loading, restaurant, locations } = useSelector(stateSelector);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { id } = useParams<{ id: string }>();

  const isEdit = Boolean(id);

  useEffect(() => {
    if (id) {
      setTimeout(() => {
        dispatch(Actions.getRestaurant(id));
      });
    }
    return () => {
      dispatch(Actions.resetRedux('restaurant'));
    };
  }, [id]);

  useEffect(() => {
    dispatch(Actions.getAllLocations());
  }, []);

  const handleViewAll = () => {
    localRedirect(`/restaurants`);
  };

  const handleSubmit = (restaurant: RestaurantFormTypes, deletedImages: ServerFileType[]) => {
    if (isEdit) {
      dispatch(Actions.updateRestaurant(restaurant, deletedImages));
    } else {
      dispatch(Actions.addRestaurant(restaurant));
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
        <RestaurantForm
          isEdit={isEdit}
          onView={handleViewAll}
          onSubmit={handleSubmit}
          data={restaurant}
          locations={locations}
        />
      </BoxWrapper>
    </>
  );
}

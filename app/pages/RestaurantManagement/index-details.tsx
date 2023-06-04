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
import { RestaurantManagementProps } from './types';
import messages from './messages';

const key = 'restaurant';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  restaurant: Selectors.makeSelectRestaurant()
});

export default function RestaurantDetailsManagement(props: RestaurantManagementProps) {
  const dispatch = useDispatch();
  const { loading, restaurant } = useSelector(stateSelector);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setModalOpen] = useState(false);

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

  const handleAction = (type: 'add' | 'edit' | 'delete', id?: string) => {
    switch (type) {
      case 'add':
        localRedirect(`/restaurants/new`);
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
        images={restaurant.galleryImages || []}
      />
      <Group position="apart" pb={32}>
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
      {restaurant && !isEmpty(restaurant) && (
        <DetailContainer {...restaurant} onAction={handleAction} onView={handleView} />
      )}
    </>
  );
}

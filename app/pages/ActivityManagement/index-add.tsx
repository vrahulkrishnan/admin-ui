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
import { ActivityFormTypes, ActivityManagementProps } from './types';
import messages from './messages';
import { ActivityForm } from './containers';

const key = 'activity';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  activity: Selectors.makeSelectActivity(),
  restaurants: Selectors.makeSelectRestaurants()
});

export default function RestaurantAddManagement(props: ActivityManagementProps) {
  const dispatch = useDispatch();
  const { loading, activity, restaurants } = useSelector(stateSelector);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { id } = useParams<{ id: string }>();

  const isEdit = Boolean(id);

  useEffect(() => {
    if (id) {
      setTimeout(() => {
        dispatch(Actions.getActivity(id));
      });
    }
    return () => {
      dispatch(Actions.resetRedux('activity'));
    };
  }, [id]);

  useEffect(() => {
    dispatch(Actions.getRestaurantList());
  }, []);

  const handleViewAll = () => {
    localRedirect(`/activities`);
  };

  const handleSubmit = (activity: ActivityFormTypes, deletedImages: ServerFileType[]) => {
    if (isEdit) {
      dispatch(Actions.updateActivity(activity, deletedImages));
    } else {
      dispatch(Actions.addActivity(activity));
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
        <ActivityForm
          isEdit={isEdit}
          onView={handleViewAll}
          onSubmit={handleSubmit}
          data={activity}
          restaurants={restaurants}
        />
      </BoxWrapper>
    </>
  );
}

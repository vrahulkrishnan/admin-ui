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
import { ActivityManagementProps } from './types';
import messages from './messages';

const key = 'activity';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  activity: Selectors.makeSelectActivity()
});

export default function ActivityDetailsManagement(props: ActivityManagementProps) {
  const dispatch = useDispatch();
  const { loading, activity } = useSelector(stateSelector);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setModalOpen] = useState(false);

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

  const handleAction = (type: 'add' | 'edit' | 'delete', id?: string) => {
    switch (type) {
      case 'add':
        localRedirect(`/activities/new`);
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
        images={activity.galleryImages || []}
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
      {activity && !isEmpty(activity) && (
        <DetailContainer {...activity} name={activity.title} onAction={handleAction} onView={handleView} />
      )}
    </>
  );
}

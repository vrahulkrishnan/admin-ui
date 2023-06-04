import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '@mantine/notifications';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga, useInjectReducer } from 'utils';
import { LoadingIndicator } from 'components';
import { Routes } from 'routes';

import { Layout } from './containers';

import * as Selectors from './selectors';
import * as Actions from './actions';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import { AppManagementProps } from './types';

const key = 'app';
const stateSelector = createStructuredSelector({
  isLoading: Selectors.makeSelectLoading(),
  data: Selectors.makeSelectData(),
  status: Selectors.makeSelectStatusMessage(),
  showStatus: Selectors.makeSelectShowStatus()
});

export default function AppManagement(props: AppManagementProps) {
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const {
    isLoading,
    showStatus,
    status: { type = 'success', message }
  } = useSelector(stateSelector);
  const [pageTitle, setPageTitle] = useState('');

  const handleCloseStatus = () => {
    dispatch(Actions.closeStatusMessage());
  };

  useEffect(() => {
    if (showStatus && message) {
      showNotification({
        message: message,
        color: type,
        styles: theme => {
          const selectedColor = theme.colors[type][3];
          return {
            root: {
              backgroundColor: theme.colors[type][0],
              borderColor: theme.colors[type][2],
              color: selectedColor
            }
          };
        },
        onClose: handleCloseStatus
      });
    }
  }, [showStatus, message]);

  return (
    <>
      <Helmet titleTemplate={messages.title} defaultTitle={messages.title} title={messages.title} />
      <LoadingIndicator visible={isLoading} />
      <Routes setPageTitle={setPageTitle} {...props} layout={Layout} layoutProps={{ pageTitle, dispatch }} />
    </>
  );
}

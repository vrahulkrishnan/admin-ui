import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useShallowEffect } from '@mantine/hooks';

import { LoadingIndicator } from 'components';
import { hasLoginAccess } from 'config';
import { useInjectSaga, useInjectReducer, localRedirect } from 'utils';

import saga from './saga';
import reducer from './reducer';
import * as Selectors from './selectors';
import { AuthManagementProps } from './types';
import messages from './messages';
import { ForgotPassword, NativeLogin, ResetPassword } from './containers';

const key = 'auth';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading()
});

export default function AuthManagement({ section = 'login' }: AuthManagementProps) {
  const { loading } = useSelector(stateSelector);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const isLoggedIn = hasLoginAccess();

  useShallowEffect(() => {
    if (isLoggedIn) {
      localRedirect('/dashboard');
    }
  }, [isLoggedIn]);

  const RenderComponent = {
    login: NativeLogin,
    fp: ForgotPassword,
    reset: ResetPassword
  }[section];
  return (
    <>
      <Helmet titleTemplate={messages.title} defaultTitle={messages.title} title={messages.title} />
      <LoadingIndicator visible={loading} />
      <RenderComponent />
    </>
  );
}

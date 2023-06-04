import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { ErrorRoute } from './ErrorRoute';
import { PublicRoute } from './PublicRoute';
import { pageRoutes } from './config';

export const Routes = (props: any): JSX.Element => {
  return (
    <Switch>
      {pageRoutes.public.map((route, ind) => (
        <PublicRoute exact {...route} {...props} key={ind} />
      ))}
      {pageRoutes.private.map((route, ind) => (
        <PrivateRoute exact {...route} {...props} key={ind} />
      ))}
      {pageRoutes.error.map((route, ind) => (
        <ErrorRoute exact {...route} {...props} key={ind} />
      ))}
      <Redirect from="/" to="/profile" />
    </Switch>
  );
};

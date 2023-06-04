import React from 'react';
import { Route } from 'react-router-dom';

export const PublicRoute = ({ component: Component, ...rest }: any): any => {
  return <Route {...rest} render={(props: any): any => <Component {...props} {...rest} />} />;
};

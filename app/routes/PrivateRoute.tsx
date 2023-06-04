import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { hasLoginAccess } from 'config';

export const PrivateRoute = ({ component: Component, layout: Layout, layoutProps, ...rest }: any): any => {
  return (
    <Route
      {...rest}
      render={(props: any): any => {
        if (hasLoginAccess()) {
          return (
            <Layout {...layoutProps}>
              <Component {...props} {...rest} />
            </Layout>
          );
        }

        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
      }}
    />
  );
};

import React from 'react';
import { Route } from 'react-router-dom';
import { hasLoginAccess } from 'config';

export const ErrorRoute = ({ component: Component, layout: Layout, layoutProps, ...rest }: any): any => {
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
        return <Component {...props} {...rest} />;
      }}
    />
  );
};

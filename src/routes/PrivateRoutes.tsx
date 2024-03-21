import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { hasLoginAccess } from 'utils';

export const PrivateRoute = ({
  component: Component,
  layout: Layout,
  layoutProps,
  isAuthenticated,
  ...rest
}: any): any => {
  // const isLoggedIn = hasLoginAccess('isAdminLoggedIn');
  const isLoggedIn = true;
  return (
    <Route
      {...rest}
      render={(props: any): any => {
        if (!isLoggedIn) {
          return <Redirect to={{ pathname: '/admin/login', state: { from: props.location } }} />;
        }
        return (
          <Layout {...layoutProps}>
            <Component {...props} {...rest} />
          </Layout>
        );
      }}
    />
  );
};

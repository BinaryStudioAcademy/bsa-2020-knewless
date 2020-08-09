import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../screens/Authentication/constants';

const PrivateRoute = ({ component: Component, roles = null, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        );
      }

      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;

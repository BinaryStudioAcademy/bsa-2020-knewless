import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../screens/Authentication/constants';
import { IAppState } from '../../models/AppState';
import { connect } from 'react-redux';
import { RoleTypes } from '../AppRouter/models/IRole';

const PrivateRoute = ({ component: Component, roles = null, user, ...rest }) => (
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
      if (roles !== null && user.id && !roles.map(r => RoleTypes[r]).includes(user?.role?.name)) {
        return (
          <Redirect
            to={{ pathname: '/', state: { from: props.location } }}
          />
        );
      }
      if (user.id) {
        return <Component {...props} />;
      }
      return () => null;
    }}
  />
);

const mapStateToProps = (state: IAppState) => {
  const { user } = state.appRouter;
  return {
    user
  };
};

export default connect(mapStateToProps)(PrivateRoute);

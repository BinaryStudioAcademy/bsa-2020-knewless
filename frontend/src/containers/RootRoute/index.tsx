import React from 'react';
import { IAppState } from '@models/AppState';
import { connect } from 'react-redux';
import PublicRoute from '@components/PublicRoute';
import LandingPage from '@screens/Landing/containers/LandingPage';
import { IUser } from '../AppRouter/models/IUser';
import { RoleTypes } from '../AppRouter/models/IRole';
import MainAuthorPage from '@screens/AuthorMainPage/containers/MainPage';
import MainStudentPage from '@screens/MainPage/containers/MainStudentPage';
import LoaderWrapper from '@components/LoaderWrapper';
import { ACCESS_TOKEN } from '@screens/Authentication/constants';

interface IRootRouteProps {
  user: IUser;
  isAuthorized: boolean;
  userLoading: boolean;
}

const RootRoute: React.FunctionComponent<IRootRouteProps> = ({ isAuthorized, user, userLoading: loading }) => {
  let currentComponent: React.FunctionComponent = () => null;
  if (!isAuthorized) {
    currentComponent = LandingPage;
  } else if (isAuthorized && user.role) {
    if (user.role.name === RoleTypes[RoleTypes.AUTHOR]) {
      currentComponent = MainAuthorPage;
    } else if (user.role.name === RoleTypes[RoleTypes.USER]) {
      currentComponent = MainStudentPage;
    }
  }
  return (
    <LoaderWrapper loading={localStorage.getItem(ACCESS_TOKEN) ? loading : false} >
      <PublicRoute
        exact
        path="/"
        component={currentComponent}
      />
    </LoaderWrapper>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { user, userLoading } = state.appRouter;
  const { isAuthorized } = state.auth.auth;
  return {
    user,
    isAuthorized,
    userLoading
  };
};

export default connect(mapStateToProps)(RootRoute);

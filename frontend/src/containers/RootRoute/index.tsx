import React, { useEffect } from 'react';
import { IAppState } from '@models/AppState';
import { connect } from 'react-redux';
import PublicRoute from '@components/PublicRoute';
import LandingPage from '@screens/Landing/containers/LandingPage';
import { IUser } from '../AppRouter/models/IUser';
import { RoleTypes } from '../AppRouter/models/IRole';
import MainAuthorPage from '@screens/AuthorMainPage/containers/MainPage';
import MainStudentPage from '@screens/MainPage/containers/MainStudentPage';
import { fetchGetAuthorSettingsRoutine } from '@screens/AuthorSettings/routines';
import { fetchGetStudentSettingsRoutine } from '@screens/StudentSettings/routines';
import { Redirect } from 'react-router-dom';
import { IBindingAction } from 'models/Callbacks';

interface IRootRouteProps {
  user: IUser;
  isAuthorized: boolean;
  isSettingsFilled: boolean;
}

const RootRoute: React.FunctionComponent<IRootRouteProps> = ({ 
  isAuthorized, 
  user, 
  isSettingsFilled
}) => {

  let currentComponent: React.FunctionComponent = () => null;

  if (user.id && window.location.pathname !== '/settings' && isSettingsFilled === false) {
    return (
      <Redirect to='/settings'/>
    );
  }
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
    <PublicRoute
      exact
      path="/"
      component={currentComponent}
    />
  );
};

const mapStateToProps = (state: IAppState) => {
  const { user, settingsFilled } = state.appRouter;
  const { isAuthorized } = state.auth.auth;
  return {
    user,
    isAuthorized,
    isSettingsFilled: settingsFilled
  };
};

export default connect(mapStateToProps)(RootRoute);

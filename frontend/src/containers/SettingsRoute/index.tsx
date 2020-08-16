import React from 'react';
import { withRouter } from 'react-router-dom';
import { IAppState } from '@models/AppState';
import { connect } from 'react-redux';
import { RoleTypes } from '../AppRouter/models/IRole';
import { IUser } from '../AppRouter/models/IUser';
import AuthorSettings from '@screens/AuthorSettings/containers/Settings';
import StudentSettings from '@screens/StudentSettings/containers/Settings';
import PrivateRoute from '../PrivateRoute';

interface ISettingsRouteProps {
  user: IUser;
  settingsMode: RoleTypes;
}

const SettingsRoute: React.FunctionComponent<ISettingsRouteProps> = ({
  settingsMode,
  user
}) => {
  let renderComponent: React.FunctionComponent = () => null;
  if (settingsMode === RoleTypes.AUTHOR
    || user?.role?.name === RoleTypes[RoleTypes.AUTHOR]) {
    renderComponent = AuthorSettings;
  } else if (settingsMode === RoleTypes.USER
    || user?.role?.name === RoleTypes[RoleTypes.USER]) {
    renderComponent = StudentSettings;
  }
  return (
    <PrivateRoute
      exact
      path="/settings"
      component={renderComponent}
    />
  );
};

const mapStateToProps = (state: IAppState) => {
  const { settingsMode, user } = state.appRouter;
  return {
    user,
    settingsMode
  };
};

export default withRouter(connect(mapStateToProps)(SettingsRoute));

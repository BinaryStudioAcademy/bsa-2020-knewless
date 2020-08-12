import React from 'react';
import { withRouter } from 'react-router-dom';
import { IAppState } from '../../models/AppState';
import { connect } from 'react-redux';
import PublicRoute from '../../components/PublicRoute';
import { RoleTypes } from '../AppRouter/models/IRole';
import { IUser } from '../AppRouter/models/IUser';
import AuthorSettings from '../../screens/AuthorSettings/containers/Settings';
import StudentSettings from '../../screens/StudentSettings/containers/Settings';

interface ISettingsRouteProps {
  user: IUser;
  settingsMode: RoleTypes;
}

const SettingsRoute: React.FunctionComponent<ISettingsRouteProps> = ({
  settingsMode,
  user
}) => (
  <PublicRoute
    exact
    path="/settings"
    component={(settingsMode === RoleTypes.AUTHOR
        || user?.role?.name === RoleTypes[RoleTypes.AUTHOR])
      ? AuthorSettings
      : StudentSettings}
  />
);

const mapStateToProps = (state: IAppState) => {
  const { settingsMode, user } = state.appRouter;
  return {
    user,
    settingsMode
  };
};

export default withRouter(connect(mapStateToProps)(SettingsRoute));

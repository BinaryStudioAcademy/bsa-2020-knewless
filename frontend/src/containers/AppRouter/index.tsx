import React, { useEffect } from 'react';
import { Router } from 'react-router-dom';
import { history } from '@helpers/history.helper';
import RolePopUp from '@components/RolePopUp';
import Routing from '../Routing';
import { IAppState } from '@models/AppState';
import { connect } from 'react-redux';
import { fetchUserRoutine, setUserRoleRoutine } from './routines';
import { IBindingAction, IBindingFunction } from '@models/Callbacks';
import { IUser } from './models/IUser';
import { RoleTypes } from './models/IRole';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@screens/Authentication/constants';
import LoaderWrapper from '@components/LoaderWrapper';

interface IAppRouterProps {
  user: IUser;
  roleLoading: boolean;
  userLoading: boolean;
  settingsMode: RoleTypes;
  isAuthorized: boolean;
  fetchUser: IBindingAction;
  setSettingsMode: IBindingFunction<RoleTypes, void>;
}

const AppRouter: React.FunctionComponent<IAppRouterProps> = ({
  user,
  settingsMode,
  isAuthorized,
  fetchUser,
  setSettingsMode,
  roleLoading,
  userLoading: loading
}) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  useEffect(() => {
    const isTokenExist = localStorage.getItem(ACCESS_TOKEN) || localStorage.getItem(REFRESH_TOKEN);
    if (isTokenExist && !roleLoading) {
      fetchUser();
    }
  }, [isAuthorized, roleLoading]);
  return (
    <LoaderWrapper loading={localStorage.getItem(ACCESS_TOKEN) ? loading : false} >
      <Router history={history}>
        {
          (settingsMode === null && !user.role && user.id && !roleLoading
            && <RolePopUp setSettingsMode={setSettingsMode} />)
        }
        <Routing isLoading={false} />
      </Router>

    </LoaderWrapper>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { isAuthorized } = state.auth.auth;
  const { user, settingsMode, roleLoading, userLoading } = state.appRouter;
  return {
    user,
    settingsMode,
    isAuthorized,
    roleLoading,
    userLoading
  };
};

const mapDispatchToProps = {
  fetchUser: fetchUserRoutine,
  setSettingsMode: setUserRoleRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);

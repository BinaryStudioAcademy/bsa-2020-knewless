import React, { useEffect } from 'react';
import { Router } from 'react-router-dom';
import { history } from '@helpers/history.helper';
import RolePopUp from '@components/RolePopUp';
import ConfirmEmailMessage from '@components/EmailConfirmation';
import Routing from '../Routing';
import { IAppState } from '@models/AppState';
import { connect } from 'react-redux';
import { fetchUserRoutine, setUserRoleRoutine, checkSettingsRoutine } from './routines';
import { IBindingAction, IBindingFunction, IBindingCallback1 } from '@models/Callbacks';
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
  emailVerified: boolean;
  fetchUser: IBindingAction;
  checkSettings: IBindingCallback1<string>;
  setSettingsMode: IBindingFunction<RoleTypes, void>;
  isSettingsFilled: boolean
}

const AppRouter: React.FunctionComponent<IAppRouterProps> = ({
  user,
  settingsMode,
  isAuthorized,
  fetchUser,
  setSettingsMode,
  roleLoading,
  emailVerified,
  userLoading: loading,
  checkSettings,
  isSettingsFilled
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
    if (isTokenExist && !roleLoading && !user.id) {
      fetchUser();
    }
  }, [isAuthorized, roleLoading]);
  
  useEffect(() => {
    if (user?.role && isSettingsFilled === undefined) {
      checkSettings(user?.role?.name);
    }
  }, [user?.role?.name]);

  return (
    <LoaderWrapper loading={localStorage.getItem(ACCESS_TOKEN) ? loading : false} >
      <Router history={history}>
        {
          (user.id && !emailVerified
            && <ConfirmEmailMessage />)
        }
        {
          (settingsMode === null && !user.role && user.id && !roleLoading && emailVerified
            && <RolePopUp setSettingsMode={setSettingsMode} />)
        }
        <Routing isLoading={false} />
      </Router>

    </LoaderWrapper>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { isAuthorized } = state.auth.auth;
  const { user, settingsMode, roleLoading, userLoading, settingsFilled } = state.appRouter;
  const { emailVerified } = user;
  return {
    user,
    settingsMode,
    isAuthorized,
    roleLoading,
    userLoading,
    emailVerified,
    isSettingsFilled: settingsFilled
  };
};

const mapDispatchToProps = {
  fetchUser: fetchUserRoutine,
  setSettingsMode: setUserRoleRoutine,
  checkSettings: checkSettingsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);

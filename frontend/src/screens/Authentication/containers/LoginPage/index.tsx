import React from 'react';
import { Redirect } from 'react-router-dom';
import { IBindingAction } from '@models/Callbacks';
import { connect } from 'react-redux';

import styles from '../styles.module.sass';
import LoginForm from '@components/LoginForm';
import AuthImage from '@components/AuthImage';
import { IAppState } from '@models/AppState';
import { loginRoutine } from '@screens/Home/routines';

export interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginProps {
  isAuthorized: boolean;
  isLoginLoading: boolean;
  isLoginFailure: boolean;
  loginUser: IBindingAction;
}

const LoginPage: React.FunctionComponent<ILoginProps> = ({
  isAuthorized,
  isLoginLoading,
  loginUser: login,
  isLoginFailure
}) => (
  isAuthorized
    ? <Redirect to="/" />
    : (
      <div className={styles.main_container}>
        {isLoginFailure
          ? (
            <div className={styles.main_container__error_message}>
              Email or password is incorrect
            </div>
          ) : null}

        <LoginForm isLoginLoading={isLoginLoading} login={login} />
        <AuthImage />
      </div>
    ));

const mapStateToProps = (state: IAppState) => {
  const { auth, requests } = state.auth;
  return ({
    isAuthorized: auth.isAuthorized,
    isLoginLoading: requests.loginRequest.loading,
    isLoginFailure: requests.loginRequest.error != null && !requests.loginRequest.loading
  });
};

const mapDispatchToProps = {
  loginUser: loginRoutine.trigger
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);


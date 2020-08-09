import React from 'react';
import { Redirect } from 'react-router-dom';
import { IBindingAction } from '../../../../models/Callbacks';
import { connect } from 'react-redux';

import styles from './styles.module.sass';
import LoginForm from '../../../../components/LoginForm';
import AuthImage from '../../../../components/AuthImage';
import { IAppState } from '../../../../models/AppState';
import { loginRoutine } from '../../../Home/routines';

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
        <LoginForm isLoginLoading={isLoginLoading} isLoginFailure={isLoginFailure} login={login} />
        <AuthImage />
      </div>
    ));

const mapStateToProps = (state: IAppState) => {
  const { isAuthorized } = state.auth.login;
  return ({
    isAuthorized,
    isLoginLoading: state.auth.requests.loginRequest.loading,
    isLoginFailure: state.auth.requests.loginRequest.error != null && !state.auth.requests.loginRequest.loading
  });
};

const mapDispatchToProps = {
  loginUser: loginRoutine.trigger
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);


import React from 'react';
import { Redirect } from 'react-router-dom';
import { IBindingAction } from '@models/Callbacks';
import { connect } from 'react-redux';

import styles from '../styles.module.sass';
import AuthImage from '@components/AuthImage';
import { IAppState } from '@models/AppState';
import { registerRoutine } from '@screens/Home/routines';
import RegisterForm from '@components/RegisterForm';
import { openLoginModalRoutine } from '@containers/LoginModal/routines';

export interface IRegisterRequest {
  email: string;
  password: string;
}

interface IRegisterProps {
  isAuthorized: boolean;
  isRegisterLoading: boolean;
  isRegisterFailure: boolean;
  registerUser: IBindingAction;
  error: string;
  closePopup: IBindingAction;
}

const RegisterPage: React.FunctionComponent<IRegisterProps> = ({
  isAuthorized,
  isRegisterLoading,
  registerUser: register,
  isRegisterFailure,
  error,
  closePopup
}) => (
  isAuthorized
    ? <Redirect to="/" />
    : (
      <div className={styles.main_container}>
        {isRegisterFailure && (<div className={styles.main_container__error_message}>{error}</div>)}
        <RegisterForm closePopup={closePopup} register={register} isRegisterLoading={isRegisterLoading} />
        <AuthImage />
      </div>
    ));

const mapStateToProps = (state: IAppState) => {
  const { auth, requests } = state.auth;
  return ({
    isAuthorized: auth.isAuthorized,
    isRegisterLoading: requests.registerRequest.loading,
    isRegisterFailure: requests.registerRequest.error != null && !requests.registerRequest.loading,
    error: requests.registerRequest.error || 'Something went wrong. Please try again'
  });
};

const mapDispatchToProps = {
  registerUser: registerRoutine.trigger,
  closePopup: openLoginModalRoutine.success
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);


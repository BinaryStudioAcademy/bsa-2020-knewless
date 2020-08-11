import React from 'react';
import { Redirect } from 'react-router-dom';
import { IBindingAction } from '../../../../models/Callbacks';
import { connect } from 'react-redux';

import styles from '../styles.module.sass';
import AuthImage from '../../../../components/AuthImage';
import { IAppState } from '../../../../models/AppState';
import { registerRoutine } from '../../../Home/routines';
import RegisterForm from '../../../../components/RegisterForm';

export interface IRegisterRequest {
  email: string;
  password: string;
}

interface IRegisterProps {
  isAuthorized: boolean;
  isRegisterLoading: boolean;
  isRegisterFailure: boolean;
  registerUser: IBindingAction;
}

const RegisterPage: React.FunctionComponent<IRegisterProps> = ({
  isAuthorized,
  isRegisterLoading,
  registerUser: register,
  isRegisterFailure
}) => (
  isAuthorized
    ? <Redirect to="/" />
    : (
      <div className={styles.main_container}>
        {isRegisterFailure
          ? (
            <div className={styles.main_container__error_message}>
              Something went wrong. Please try again
            </div>
          ) : null}

        <RegisterForm register={register} isRegisterLoading={isRegisterLoading} />
        <AuthImage />
      </div>
    ));

const mapStateToProps = (state: IAppState) => {
  const { auth, requests } = state.auth;
  return ({
    isAuthorized: auth.isAuthorized,
    isRegisterLoading: requests.registerRequest.loading,
    isRegisterFailure: requests.registerRequest.error != null && !requests.registerRequest.loading
  });
};

const mapDispatchToProps = {
  registerUser: registerRoutine.trigger
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);


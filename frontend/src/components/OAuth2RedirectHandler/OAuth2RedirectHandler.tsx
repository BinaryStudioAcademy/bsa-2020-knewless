import React, { FunctionComponent } from 'react';
import { ACCESS_TOKEN } from '../../screens/Authentication/constants';
import { Redirect } from 'react-router-dom';
import { IBindingAction } from '../../models/Callbacks';
import { loginRoutine } from '../../screens/Home/routines';
import { connect } from 'react-redux';

interface IOAuthProps {
  history: any;
  loginUser: IBindingAction;
}

// This component is used to handle redirect from oauth and extract token from url if exists
const OAuth2Handler: FunctionComponent<IOAuthProps> = ({
  history,
  loginUser: login
}) => {
  const getUrlParameter = (field: string) => {
    const name = field.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp(`[?&]${name}=([^&#]*)`);

    const results = regex.exec(history.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  const isTokenExtracted = () => {
    const token = getUrlParameter('token');
    if (token) {
      localStorage.setItem(ACCESS_TOKEN, getUrlParameter('token'));
      login();
      return true;
    }
    return false;
  };

  return (
    isTokenExtracted()
      ? (
        <Redirect to="/" />
      )
      : (
        <Redirect to={{
          pathname: '/login',
          state: {
            error: getUrlParameter('error')
          }
        }}
        />
      )
  );
};

const mapDispatchToProps = {
  loginUser: loginRoutine.success
};

export default connect(
  null,
  mapDispatchToProps
)(OAuth2Handler);

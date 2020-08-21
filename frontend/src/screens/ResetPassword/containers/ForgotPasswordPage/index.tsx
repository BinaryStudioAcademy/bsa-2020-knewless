import React, { useState } from 'react';
import styles from './styles.module.sass';
import { fetchResetLinkRoutine } from 'screens/ResetPassword/routines';
import { connect } from 'react-redux';
import { IAppState } from 'models/AppState';
import { Input, Button } from 'semantic-ui-react';
import  LogoWithText  from 'components/LogoWithText';
import { useHistory } from 'react-router-dom';
import { IBindingCallback1 } from 'models/Callbacks';
import { toastr } from 'react-redux-toastr';
import GrayOutlineButton from 'components/buttons/GrayOutlineButton';
import { isValidEmail as isValidNew } from '@helpers/validation.helper';

interface IForgotPasswordProps {
  isValidEmail: boolean;
  isLinkFetched: boolean;
  fetchResetLink: IBindingCallback1<String>;
  isLoading: boolean;
}

const ForgotPassword: React.FunctionComponent<IForgotPasswordProps> = ({
  isValidEmail, isLinkFetched, fetchResetLink, isLoading
}) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [inputStyle, setInputStyle] = useState(styles.custominput);
  const handleClickOut = e => {
    if (e.target.id !== "input_reset_span" && e.target.id !== "input_reset") {
      setInputStyle(styles.custominput);
    }
  }
  const validateEmail = () => {
    if (email.length < 1) return;
    setIsValid(isValidNew(email));
  }

  const handleFetchLink = () => {
    if (email.length < 1) {
      setIsValid(false);
      return;
    }
    if (!isValid) {
      toastr.error('Invalid email');
      return;
    }
    fetchResetLink(email);
  }
  
  return (
    <div onClick={e => handleClickOut(e)} className={styles.mainContainer}>
      <div className={styles.resetcontainer}>
        <div className={styles.topcontainer}>
          <div className={styles.logocontainer}>
            <LogoWithText />
          </div>
          {isLinkFetched && isValidEmail ? "" : <h1 className={styles.header}>Forgot Password</h1> }
        </div>
        {isLinkFetched && isValidEmail ? (
          <div className={styles.contentContainer}>
            <div className={styles.textfieldLast}>
              Check your email
            <br />
              We've just sent you a link to reset your password
            </div>
          </div>) : (
          <div className={styles.contentContainer}>
            <div className={styles.textfield}>
              Enter your email address and we'll send you a link to reset your password
            </div>
            <span id="input_reset_span" onClick={() => setInputStyle(styles.custominput_pushed)} className={styles.textfield}>
              Email
            </span>
            <Input
              onBlur={validateEmail}
              onChange={e => {setEmail(e.target.value); setIsValid(true)}}
              id="input_reset"
              onClick={() => setInputStyle(styles.custominput_pushed)}
              className={inputStyle}
              value={email}
            />
            <Button
              loading={isLoading}
              onClick={() => handleFetchLink()}
              className={styles.button_send}
            >
              Send email
            </Button>
            <GrayOutlineButton onClick={() => history.push('/login')} className={styles.cancel_button}>Cancel</GrayOutlineButton>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { isValidEmail, isFetched, isLoading } = state.resetpassword.data;
  return {
    isLoading,
    isValidEmail,
    isLinkFetched: isFetched
  };
};

const mapDispatchToProps = {
  fetchResetLink: fetchResetLinkRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
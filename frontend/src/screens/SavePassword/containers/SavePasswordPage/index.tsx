import React, { useState, useEffect } from 'react';
import styles from './styles.module.sass';
import { savePasswordRoutine, fetchIsLinkValidRoutine } from 'screens/SavePassword/routines';
import { connect } from 'react-redux';
import { IAppState } from 'models/AppState';
import { Input, Button, Loader, Message } from 'semantic-ui-react';
import  LogoWithText  from 'components/LogoWithText';
import { useHistory } from 'react-router-dom';
import { IBindingCallback1 } from 'models/Callbacks';
import  { Redirect } from 'react-router-dom'
import { isValidPassword as isValidNew, PASSWORD_MESSAGE } from '@helpers/validation.helper';
import { toastr } from 'react-redux-toastr';

interface ISavePasswordProps {
  isValidLink: boolean;
  userEmail: string;
  isSavedSuccessfull: boolean;
  saveMessage: string;
  saveLoading: boolean;
  save: IBindingCallback1<ISaveEntity>;
  checkLink: IBindingCallback1<String>;
  match: any;
  loading: boolean
}

interface ISaveEntity {
  password: string;
  resetId: string;
}

const SavePassword: React.FunctionComponent<ISavePasswordProps> = ({
  isValidLink, userEmail, isSavedSuccessfull, saveMessage, saveLoading, save, checkLink, match, loading
}) => {
  const resetId = match.params.resetid;
  useEffect(() => {
      checkLink(resetId);
  }, [checkLink, resetId]);

  
  const [inputStyle1, setInputStyle1] = useState(styles.custominput);
  const [inputStyle2, setInputStyle2] = useState(styles.custominput);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isValid, setIsValid] = useState(true);
  const history = useHistory();
  const handleSave = () => {
    if (password !== password2) {
      toastr.error('Passwords not match');
      return;
    }
    if (!isValid) {
      toastr.error(PASSWORD_MESSAGE);
      return;
    }
    save({
      resetId,
      password
    });
  }

  
  const hideEmail = (mail: string): string => {
    if (!mail) return '';
    const pos = mail.indexOf('@')
    const substr = mail.substring(1, pos);
    return mail.replace(substr, '••••••');
  }

  const handleClickOut = e => {
    if (e.target.id !== "input_reset_span" && e.target.id !== "input_reset1" && e.target.id !== "input_reset2") {
      setInputStyle1(styles.custominput);
      setInputStyle2(styles.custominput);
    }
  }

  const validatePassword = () => {
    setIsValid(isValidNew(password));
  }

  if (isSavedSuccessfull) {
    toastr.success(saveMessage);
    return <Redirect to='/login'  />
  }
  
  return (
    <div onClick={e => handleClickOut(e)} className={styles.mainContainer}>
      <div className={styles.resetcontainer}>
        <div className={styles.topcontainer}>
          <div className={styles.logocontainer}>
            <LogoWithText />
          </div>
          <h1 className={styles.header}>Set new Password</h1>
          {loading ? "" : (
          <div>
            {isValidLink ? "" : (
              <Message
                warning
                className={styles.warning_message}
              >
                {userEmail? 'This link have been expired' : 'Not valid link'}
              </Message>
            )}
          </div>)}
        </div>
        {loading? <Loader active inline='centered' /> : (
        <div className={styles.contentContainer}>
          <span className={styles.textfield_inactive}>
            Email
          </span>
          <Input
            disabled
            className={styles.custominput}
            value={hideEmail(userEmail)}
          />
          <br />
          <span
            id="input_reset_span"
            onClick={() => {setInputStyle1(styles.custominput_pushed); setInputStyle2(styles.custominput);}}
            className={styles.textfield}
          >
            Password
          </span>
          <Input
            disabled={!isValidLink}
            onBlur={validatePassword}
            type="password"
            onChange={e => {setPassword(e.target.value); setIsValid(true)}}
            id="input_reset1"
            onFocus={() => {setInputStyle1(styles.custominput_pushed); setInputStyle2(styles.custominput);}}
            className={inputStyle1}
            value={password}
          />
          <span
            id="input_reset_span"
            onClick={() => {setInputStyle2(styles.custominput_pushed); setInputStyle1(styles.custominput);}}
            className={styles.textfield}
          >
            Confirm password
          </span>
          <Input
            disabled={!isValidLink}
            onBlur={validatePassword}
            onChange={e => {setPassword2(e.target.value); setIsValid(true)}}
            id="input_reset2"
            type="password"
            onFocus={() => {setInputStyle2(styles.custominput_pushed); setInputStyle1(styles.custominput);}}
            className={inputStyle2}
            value={password2}
          />
          <Button
            disabled={!isValidLink}
            loading={saveLoading}
            onClick={() => handleSave()}
            className={styles.button_send}
          >
            Save
          </Button>
        </div>)}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { isValidLink, isSavedSuccessfull, saveMessage, userEmail } = state.savepassword.data;
  return {
    isValidLink,
    isSavedSuccessfull,
    saveMessage,
    userEmail,
    loading: state.savepassword.requests.checkLinkRequest.loading,
    saveLoading: state.savepassword.requests.savePasswordRequest.loading
  };
};

const mapDispatchToProps = {
  checkLink: fetchIsLinkValidRoutine,
  save: savePasswordRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(SavePassword);
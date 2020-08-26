import React, { useState, useEffect } from 'react';
import { setToken } from 'services/auth.service';
import { confirmEmail } from './confirm.email.service';
import { IBindingAction } from '@models/Callbacks';
import { connect } from 'react-redux';
import LoaderWrapper from 'components/LoaderWrapper';
import { Redirect } from 'react-router-dom';
import styles from './styles.module.sass';
import  LogoWithText  from 'components/LogoWithText';
import { fetchUserRoutine } from 'containers/AppRouter/routines';

interface IVerifyEmailProps {
    match: any;
    fetchUser: IBindingAction;
  }

const VerifyEmail: React.FunctionComponent<IVerifyEmailProps> = ({ match, fetchUser }) => {
  const verifyId = match.params.confirmId;
  const [isVeryfied, setIsVerified] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isUserUpdated, setIsUserUpdated] = useState(false);

  useEffect(() => {
    confirmEmail(verifyId).then(result => {
      setIsVerified(result.verified);
      setIsChecked(true);
      if (result.verified) {
        setToken(result.token, result.refresh);
        fetchUser();
        setIsUserUpdated(true);
      }
    });
}, [fetchUser, verifyId]);

  if (!isChecked) return <LoaderWrapper loading={isChecked} />;
  if (isChecked && !isVeryfied) return (
    <div className={styles.mainContainer}>
      <div className={styles.messagecontainer}>
        <div className={styles.logocontainer}>
          <LogoWithText />
        </div>
        <div className={styles.textfield}>
          Not valid link
        </div>
      </div>
    </div>
  );
  if (isUserUpdated) return <Redirect to="/" />
  return <LoaderWrapper loading />;
};

const mapDispatchToProps = {
  fetchUser: fetchUserRoutine
};

export default connect(null, mapDispatchToProps)(VerifyEmail);
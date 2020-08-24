import React from 'react';
import styles from './styles.module.sass';
import  LogoWithText  from 'components/LogoWithText';
import {connect} from 'react-redux';
import { IAppState } from '@models/AppState';
import { Icon, Label } from 'semantic-ui-react';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'screens/Authentication/constants';
import { useHistory } from 'react-router-dom';

interface IConfirmEmailMessageProps {
  email: string
}
  

const ConfirmEmailMessage: React.FunctionComponent<IConfirmEmailMessageProps> = ({ email }) => {
  const history = useHistory();

  const handleBackToLogin = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    history.push('/login');
    history.go();
  };


  return (
    <div className={styles.mainContainer}>
      <div className={styles.messagecontainer}>
        <div className={styles.topRow}>
          <div className={styles.logocontainer}>
            <LogoWithText />
          </div>
          <Label
            basic
            size="large"
            as="a"
            onClick={() => handleBackToLogin()}
            className={styles.toolBarIcon}
          >
            <Icon name="list alternate" size="large" inverted />
            Back to login
          </Label>
        </div>
        <h2 className={styles.header}>Confirm Your Email Address</h2>
        <div className={styles.textfield}>
          A confirmation email has been sent to <strong>{`${email}`}</strong>. 
          Click on the confirmation link in the email to activate your account.
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
    email: state.appRouter.user.email
  });

export default connect(mapStateToProps)(ConfirmEmailMessage);
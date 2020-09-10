import { Button, Divider, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from '@screens/Authentication/constants';
import React, { FunctionComponent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import LogoWithText from '../LogoWithText';
import styles from './styles.module.sass';
import { IRegisterRequest } from '@screens/Authentication/containers/RegisterPage';
import GradientButton from '../buttons/GradientButton';
import {
  EMAIL_MESSAGE,
  isValidEmail,
  isValidPassword,
  PASSWORD_MESSAGE,
  PASSWORDS_NOT_MATCH
} from '@helpers/validation.helper';

interface IRegisterForm {
  register: IBindingCallback1<IRegisterRequest>;
  isRegisterLoading: boolean;
  closePopup: IBindingAction;
}

const RegisterForm: FunctionComponent<IRegisterForm> = ({
  register,
  isRegisterLoading,
  closePopup
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);

  const validateEmail = (newName?: string) => setIsEmailValid(
    isValidEmail(typeof newName === 'string' ? newName : email)
  );
  const validatePassword = (newName?: string) => {
    const lastChangeValue = typeof newName === 'string' ? newName : password;
    setIsPasswordValid(isValidPassword(lastChangeValue));
    setIsPasswordsMatch(lastChangeValue === repeatPassword);
  };
  const validateRepeatPassword = (newName?: string) => setIsPasswordsMatch(
    (typeof newName === 'string' ? newName : repeatPassword) === password
  );
  const isRequiredFieldsValid = (): boolean => isValidEmail(email) && isValidPassword(password)
    && password === repeatPassword;

  const handleLoginClick = e => {
    e.preventDefault();
    if (isRequiredFieldsValid) {
      register({ email, password });
    }
  };

  closePopup();

  return (
    <div>
      <Grid textAlign="center" className={styles.main_container}>
        <Grid.Column className={styles.main_container__column}>
          <Header as="h2" textAlign="center" className={styles.main_container__header}>
            <LogoWithText />
          </Header>
          <Form
            name="loginForm"
            size="large"
            onSubmit={handleLoginClick}
            warning={!isEmailValid || !isPasswordValid || !isPasswordsMatch}
          >
            <Segment className={styles.main_container__form}>
              <Form.Input
                fluid
                icon="at"
                iconPosition="left"
                placeholder="Email"
                type="text"
                labelPosition="left"
                label="Email"
                required
                onChange={e => { setEmail(e.target.value); validateEmail(e.target.value); }}
                error={!isEmailValid}
                onBlur={validateEmail}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                labelPosition="left"
                label="Password"
                required
                onChange={e => { setPassword(e.target.value); validatePassword(e.target.value); }}
                error={!isPasswordValid}
                onBlur={validatePassword}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Repeat password"
                type="password"
                labelPosition="left"
                label="Repeat password"
                required
                onChange={e => { setRepeatPassword(e.target.value); validateRepeatPassword(e.target.value); }}
                error={!isPasswordsMatch}
                onBlur={validateRepeatPassword}
              />
              <Message
                warning
                list={[
                  !isEmailValid && EMAIL_MESSAGE,
                  !isPasswordValid && PASSWORD_MESSAGE,
                  !isPasswordsMatch && PASSWORDS_NOT_MATCH
                ]}
              />
              <div className={styles.main_container__submit_block}>
                <GradientButton
                  className={styles.main_container__button_auth}
                  loading={isRegisterLoading}
                  disabled={!isRequiredFieldsValid()}
                >
                  SIGN UP
                </GradientButton>
                <Divider className={styles.main_container__divider} horizontal>Or</Divider>
                <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                  <Button circular type="button" icon="google" color="google plus" />
                </a>
                <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                  <Button circular type="button" icon="facebook official" color="facebook" />
                </a>
              </div>
            </Segment>
          </Form>
          <Message className={styles.main_container__signUp_message}>
            Have an account?
            {' '}
            <NavLink exact to="/login">Sign in</NavLink>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default RegisterForm;

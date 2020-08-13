import { Button, Divider, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from '../../screens/Authentication/constants';
import React, { FunctionComponent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IBindingCallback1 } from '../../models/Callbacks';
import LogoWithText from '../LogoWithText';

import styles from './styles.module.sass';
import { IRegisterRequest } from '../../screens/Authentication/containers/RegisterPage';
import GradientButton from '../buttons/GradientButton';

interface IRegisterForm {
  register: IBindingCallback1<IRegisterRequest>;
  isRegisterLoading: boolean;
}

const RegisterForm: FunctionComponent<IRegisterForm> = ({
  register,
  isRegisterLoading
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordEqual, setIsPasswordEqual] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isError, setIsError] = useState(false);

  const mailRegex = new RegExp('^\\w[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]{1,34}@[a-zA-Z0-9-]\\w+'
    + '[a-zA-Z0-9-](?:.[a-zA-Z0-9-]+)*$');
  const passwordRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,32}$');

  const emailChanged = data => {
    setEmail(data);
    setIsEmailValid(data.length > 0 && mailRegex.test(data));
  };

  const passwordChanged = data => {
    setPassword(data);
    setIsPasswordValid(passwordRegex.test(data));
    setIsPasswordEqual(data === password2);
  };

  const password2Changed = data => {
    setPassword2(data);
    setIsPasswordEqual(data.length !== 0 && password === data);
  };

  const handleLoginClick = () => {
    setIsError(false);
    if (isPasswordValid && isPasswordEqual && isEmailValid) {
      register({ email, password });
    } else {
      setIsError(true);
    }
  };

  return (
    <div>
      {isError
      && <div className={styles.main_container__error_message}>All fields are required. Please double check</div>}
      <Grid textAlign="center" className={styles.main_container}>
        <Grid.Column className={styles.main_container__column}>
          <Header as="h2" textAlign="center" className={styles.main_container__header}>
            <LogoWithText />
          </Header>
          <Form
            name="loginForm"
            size="large"
            onSubmit={handleLoginClick}
            warning={password.length > 0 && !isPasswordValid}
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
                error={!isEmailValid}
                onChange={ev => emailChanged(ev.target.value)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                labelPosition="left"
                label="Password"
                error={!isPasswordValid}
                onChange={ev => passwordChanged(ev.target.value)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Repeat password"
                type="password"
                labelPosition="left"
                label="Repeat password"
                error={!isPasswordEqual}
                onChange={ev => password2Changed(ev.target.value)}
              />
              <Message
                warning
                list={[
                  !isPasswordValid && 'Password should be at least 8 characters and contain one letter and digit'
                ]}
              />
              <div className={styles.main_container__submit_block}>
                <GradientButton
                  className={styles.main_container__button_auth}
                  loading={isRegisterLoading}
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

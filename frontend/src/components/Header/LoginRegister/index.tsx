import React from 'react';
import { Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.sass';

const LoginRegister = () => (
  <div>
    <Button className={styles.button_login}>login</Button>
    <NavLink exact to="/">
      <Button className={styles.button_register}>register</Button>
    </NavLink>
  </div>
);

export default LoginRegister;

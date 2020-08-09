import React from 'react';
import { Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.sass';

const LoginRegister = () => (
  <div>
    <NavLink exact to="/login">
      <Button className={styles.button_login}>login</Button>
    </NavLink>
    <NavLink exact to="/">
      <Button className={styles.button_register}>register</Button>
    </NavLink>
  </div>
);

export default LoginRegister;

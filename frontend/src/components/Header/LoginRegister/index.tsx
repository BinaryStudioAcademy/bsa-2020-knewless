import React from 'react';
import { Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.sass';

const LoginRegister = () => (
  <div className={styles.button_container}>
    <NavLink exact to="/login">
      <Button className={styles.button_login}>login</Button>
    </NavLink>
    <NavLink exact to="/register">
      <Button className={styles.button_register}>register</Button>
    </NavLink>
  </div>
);

export default LoginRegister;
